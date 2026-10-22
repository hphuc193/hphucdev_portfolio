import os
from PIL import Image, ImageDraw, ImageFont
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

def generate_icons():
    app_dir = r"e:/hphucdev_portfolio/src/app"
    public_dir = r"e:/hphucdev_portfolio/public"
    brain_dir = r"C:/Users/PC/.gemini/antigravity/brain/79dc6cdc-7441-4ccb-b2fb-ce37090d91c9"
    
    os.makedirs(app_dir, exist_ok=True)
    os.makedirs(public_dir, exist_ok=True)
    os.makedirs(brain_dir, exist_ok=True)
    
    font_path = "C:/Windows/Fonts/segoeuib.ttf"
    ttf = TTFont(font_path)
    glyph_set = ttf.getGlyphSet()
    
    size = 512
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    
    # Rounded squircle background
    radius = 112
    d.rounded_rectangle(
        [4, 4, size - 5, size - 5],
        radius=radius,
        fill=(0, 0, 0, 255),
        outline=(42, 42, 44, 255),
        width=8
    )
    
    font_size = 300
    font = ImageFont.truetype(font_path, font_size)
    b_h = d.textbbox((0, 0), "H", font=font)
    b_p = d.textbbox((0, 0), "P", font=font)
    w_h = b_h[2] - b_h[0]
    w_p = b_p[2] - b_p[0]
    h = b_h[3] - b_h[1]
    
    gap = 14
    total_w = w_h + gap + w_p
    start_x = (size - total_w) / 2.0
    start_y = (size - h) / 2.0
    
    # Draw text in Pillow
    d.text((start_x - b_h[0], start_y - b_h[1]), "H", fill=(255, 255, 255, 255), font=font)
    d.text((start_x + w_h + gap - b_p[0], start_y - b_p[1]), "P", fill=(255, 255, 255, 255), font=font)
    
    # Save master 512x512 PNG
    master_png = os.path.join(brain_dir, "icon_master_512.png")
    img.save(master_png, "PNG")
    print(f"Saved master image: {master_png}")
    
    # Multi-resolution ICO (16, 32, 48, 64, 128, 256)
    ico_sizes = [(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
    ico_frames = [img.resize(s, Image.Resampling.LANCZOS) for s in ico_sizes]
    
    app_ico = os.path.join(app_dir, "favicon.ico")
    public_ico = os.path.join(public_dir, "favicon.ico")
    
    ico_frames[0].save(app_ico, format="ICO", sizes=ico_sizes, append_images=ico_frames[1:])
    ico_frames[0].save(public_ico, format="ICO", sizes=ico_sizes, append_images=ico_frames[1:])
    print(f"Saved multi-resolution ICO to {app_ico} and {public_ico}")
    
    # Apple Touch Icon (180x180)
    apple_180 = img.resize((180, 180), Image.Resampling.LANCZOS)
    apple_180.save(os.path.join(app_dir, "apple-icon.png"), "PNG")
    apple_180.save(os.path.join(public_dir, "apple-icon.png"), "PNG")
    apple_180.save(os.path.join(public_dir, "apple-touch-icon.png"), "PNG")
    print("Saved Apple Touch Icons")
    
    # PWA / Web App Manifest icons
    png_192 = img.resize((192, 192), Image.Resampling.LANCZOS)
    png_192.save(os.path.join(public_dir, "icon-192.png"), "PNG")
    img.save(os.path.join(public_dir, "icon-512.png"), "PNG")
    print("Saved PWA PNG icons")
    
    # Vector SVG path generation (exact mathematical match)
    scale = h / 1434.0
    baseline_y = start_y + h
    
    pen_h = SVGPathPen(glyph_set)
    t_h = TransformPen(pen_h, (scale, 0, 0, -scale, start_x - 164 * scale, baseline_y))
    glyph_set["H"].draw(t_h)
    path_h = pen_h.getCommands()
    
    origin_p = start_x + w_h + gap
    pen_p = SVGPathPen(glyph_set)
    t_p = TransformPen(pen_p, (scale, 0, 0, -scale, origin_p - 164 * scale, baseline_y))
    glyph_set["P"].draw(t_p)
    path_p = pen_p.getCommands()
    
    svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <rect width="512" height="512" rx="112" fill="#000000" />
  <rect x="4" y="4" width="504" height="504" rx="108" fill="none" stroke="#2a2a2c" stroke-width="8" />
  <path d="{path_h} {path_p}" fill="#FFFFFF" />
</svg>
"""
    
    with open(os.path.join(app_dir, "icon.svg"), "w", encoding="utf-8") as f:
        f.write(svg_content)
    with open(os.path.join(public_dir, "icon.svg"), "w", encoding="utf-8") as f:
        f.write(svg_content)
    with open(os.path.join(brain_dir, "perfect_vector.svg"), "w", encoding="utf-8") as f:
        f.write(svg_content)
    print("Saved mathematically centered SVG icons")

if __name__ == "__main__":
    generate_icons()
