# -*- coding: utf-8 -*-
"""Generate public/og-image.png, the 1200x630 card shown when the site is shared.

Why:  site.ogImage has always pointed at /og-image.png and the file never existed, so
      every LinkedIn, X, Slack and WhatsApp share of the portfolio rendered a blank card.
What: Composites the share card from the site's own theme tokens and profile photo.
Result: A 1200x630 PNG matching the light Switchboard palette, written to public/.
Changelog:
  2026-08-21 - Created.
  2026-09-12 - Role lines retitled to Agentic AI & Automation Engineer to match profile.title.
  2026-09-12 - Switchboard palette (carmine accent) and grotesque font stand-ins.
  2026-10-01 - Domain follows site.url (harishg.com); fonts resolve on Linux as well as Windows.

Fonts fall back to whichever local faces match the site's roles, because the
Google-hosted originals (Schibsted Grotesk, Atkinson Hyperlegible Next, Martian Mono)
are not installed on either machine: Windows uses Segoe UI Black / Bold / Regular and
Consolas, Linux uses the Liberation and DejaVu equivalents.
"""
import os
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630

# Theme tokens read from src/index.css (light theme).
PAPER = (252, 252, 253)      # --background  #fcfcfd
INK = (18, 20, 23)           # --foreground  #121417
MUTED = (91, 96, 112)        # --muted-foreground #5b6070
BORDER = (227, 229, 234)     # --border      #e3e5ea
ACCENT = (179, 34, 58)       # --primary     #b3223a (carmine)

# One entry per text role, most faithful face first. The card is generated from
# whichever machine is at hand, so each role lists its Windows face and its Linux
# equivalent rather than assuming C:/Windows/Fonts exists.
FONT_ROLES = {
    # Schibsted Grotesk stand-in: the heaviest grotesque available.
    'display-heavy': ['C:/Windows/Fonts/seguibl.ttf',
                      '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf',
                      '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'],
    # Display role line, one weight down from the name.
    'display-bold': ['C:/Windows/Fonts/segoeuib.ttf',
                     '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf',
                     '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'],
    # Atkinson Hyperlegible Next stand-in: a plain humanist sans.
    'body': ['C:/Windows/Fonts/segoeui.ttf',
             '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf',
             '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'],
    # Martian Mono stand-in, for the domain line and tech chips.
    'mono': ['C:/Windows/Fonts/consola.ttf',
             '/usr/share/fonts/truetype/liberation/LiberationMono-Regular.ttf',
             '/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf'],
}


def font(role, size):
    """Load the first installed face for a text role, refusing to silently downgrade.

    Why:  PIL's load_default() returns a small fixed-size bitmap face, so a missing
          file would render a heading at ~11px instead of the size asked for. That
          failure is invisible until you look at the PNG, so raise instead.
    What: Resolves one of the FONT_ROLES candidate lists against the filesystem, so
          the same script runs on the Windows box and under Linux.
    Result: an ImageFont for the best available face, or a hard exit naming the role.

    Input:  role - a key of FONT_ROLES; size - point size in px.
    Output: an ImageFont instance at the requested size.
    """
    for path in FONT_ROLES[role]:
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    raise SystemExit('no font installed for role %r; tried: %s'
                     % (role, ', '.join(FONT_ROLES[role])))


f_name = font('display-heavy', 96)
f_role = font('display-bold', 40)
f_body = font('body', 26)
f_mono = font('mono', 24)

img = Image.new('RGB', (W, H), PAPER)
d = ImageDraw.Draw(img)

# Hairline frame, the same border the site uses around cards.
d.rectangle([0, 0, W - 1, H - 1], outline=BORDER, width=2)

# Accent bar down the left edge: the one piece of brand colour on the card.
d.rectangle([0, 0, 10, H], fill=ACCENT)

X = 84                       # left margin for all text
PHOTO = 300                  # circular portrait diameter

# --- portrait, circular, on the right -----------------------------------
photo_path = 'public/profile.jpg'
if os.path.exists(photo_path):
    p = Image.open(photo_path).convert('RGB')
    # Square-crop from the centre before resizing so the face is not stretched.
    side = min(p.size)
    left = (p.width - side) // 2
    top = (p.height - side) // 2
    p = p.crop((left, top, left + side, top + side)).resize(
        (PHOTO, PHOTO), Image.LANCZOS)

    mask = Image.new('L', (PHOTO * 4, PHOTO * 4), 0)   # 4x for a smooth edge
    ImageDraw.Draw(mask).ellipse([0, 0, PHOTO * 4, PHOTO * 4], fill=255)
    mask = mask.resize((PHOTO, PHOTO), Image.LANCZOS)

    px, py = W - PHOTO - 96, (H - PHOTO) // 2
    d.ellipse([px - 6, py - 6, px + PHOTO + 6, py + PHOTO + 6], outline=BORDER, width=3)
    img.paste(p, (px, py), mask)
    text_w = px - X - 56                # keep text clear of the portrait
else:
    text_w = W - X * 2

# --- text block ----------------------------------------------------------
y = 150

d.text((X, y), 'Harish G', font=f_name, fill=INK)
y += 124

d.text((X, y), 'Agentic AI &', font=f_role, fill=INK)
y += 46
d.text((X, y), 'Automation Engineer', font=f_role, fill=ACCENT)
y += 66

d.text((X, y), 'Voice agents, tool calling and', font=f_body, fill=MUTED)
y += 34
d.text((X, y), 'RAG in production.', font=f_body, fill=MUTED)

# Domain, in the mono face the site uses for tech chips.
d.text((X, H - 86), 'harishg.com', font=f_mono, fill=ACCENT)

img.save('public/og-image.png', 'PNG', optimize=True)
print('wrote public/og-image.png  %dx%d  %d bytes'
      % (img.width, img.height, os.path.getsize('public/og-image.png')))
