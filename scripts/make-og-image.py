# -*- coding: utf-8 -*-
"""Generate public/og-image.png, the 1200x630 card shown when the site is shared.

Why:  site.ogImage has always pointed at /og-image.png and the file never existed, so
      every LinkedIn, X, Slack and WhatsApp share of the portfolio rendered a blank card.
What: Composites the share card from the site's own theme tokens and profile photo.
Result: A 1200x630 PNG matching the Editorial Light palette, written to public/.
Changelog:
  2026-08-21 - Created.

Fonts fall back the same way the site does: Fraunces -> Georgia, Hanken Grotesk ->
Segoe UI, JetBrains Mono -> Consolas. The fallbacks are what actually render here,
since the Google-hosted originals are not installed locally.
"""
import os
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630

# Theme tokens read from src/index.css (light theme).
PAPER = (250, 250, 249)      # --background  #fafaf9
INK = (28, 25, 23)           # --foreground  #1c1917
MUTED = (107, 114, 128)      # --muted-foreground #6b7280
BORDER = (231, 229, 228)     # --border      #e7e5e4
BLUE = (37, 99, 235)         # --primary     #2563eb

FONTS = 'C:/Windows/Fonts/'


def font(name, size):
    """Load a system font by filename, refusing to silently downgrade.

    PIL's load_default() returns a small fixed-size bitmap face, so a missing file
    would render a heading at ~11px instead of the size asked for. That failure is
    invisible until you look at the PNG, so raise instead.

    Input:  name - filename under C:/Windows/Fonts; size - point size in px.
    Output: an ImageFont instance at the requested size.
    """
    path = os.path.join(FONTS, name)
    if not os.path.exists(path):
        raise SystemExit('missing font: %s' % path)
    return ImageFont.truetype(path, size)


f_name = font('georgiab.ttf', 92)       # Fraunces stand-in: display serif, bold
f_role = font('segoeuib.ttf', 40)       # Hanken Grotesk stand-in: bold
f_body = font('segoeui.ttf', 26)
f_mono = font('consola.ttf', 24)

img = Image.new('RGB', (W, H), PAPER)
d = ImageDraw.Draw(img)

# Hairline frame, the same stone border the site uses around cards.
d.rectangle([0, 0, W - 1, H - 1], outline=BORDER, width=2)

# Accent bar down the left edge: the one piece of brand colour on the card.
d.rectangle([0, 0, 10, H], fill=BLUE)

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
y += 118

d.text((X, y), 'AI Engineer &', font=f_role, fill=INK)
y += 46
d.text((X, y), 'Full-Stack Developer', font=f_role, fill=INK)
y += 66

d.text((X, y), 'Voice agents, RAG pipelines and', font=f_body, fill=MUTED)
y += 34
d.text((X, y), 'offline-first systems.', font=f_body, fill=MUTED)

# Domain, in the mono face the site uses for tech chips.
d.text((X, H - 86), 'harishgreddy.vercel.app', font=f_mono, fill=BLUE)

img.save('public/og-image.png', 'PNG', optimize=True)
print('wrote public/og-image.png  %dx%d  %d bytes'
      % (img.width, img.height, os.path.getsize('public/og-image.png')))
