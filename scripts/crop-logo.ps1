Add-Type -AssemblyName System.Drawing

$srcPath = 'C:\Users\deep1\.gemini\antigravity-ide\brain\181c90b6-691c-42d6-85b4-6401a81e8f17\.user_uploaded\media_1789022539995.jpg'
if (-not (Test-Path $srcPath)) {
    Write-Error "Source image not found: $srcPath"
    exit 1
}

$img = [System.Drawing.Image]::FromFile($srcPath)
Write-Output "Image loaded. Dimensions: $($img.Width)x$($img.Height)"

# Crop a square from top-center
$size = [int]($img.Width)
$cropX = 0
$cropY = [int]($img.Height * 0.04)
if (($cropY + $size) -gt $img.Height) {
    $size = [int]($img.Height - $cropY)
}

$bmp = New-Object System.Drawing.Bitmap $size, $size
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

$srcRect = New-Object System.Drawing.Rectangle $cropX, $cropY, $size, $size
$destRect = New-Object System.Drawing.Rectangle 0, 0, $size, $size
$g.DrawImage($img, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)

$assetsDir = 'assets'
if (-not (Test-Path $assetsDir)) {
    New-Item -ItemType Directory -Path $assetsDir -Force | Out-Null
}

$logoPath = Join-Path $assetsDir 'logo.png'
$bmp.Save($logoPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Save((Join-Path $assetsDir 'icon-512.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Save((Join-Path $assetsDir 'icon-192.png'), [System.Drawing.Imaging.ImageFormat]::Png)

$folders = @('mipmap-mdpi', 'mipmap-hdpi', 'mipmap-xhdpi', 'mipmap-xxhdpi', 'mipmap-xxxhdpi')
foreach ($folder in $folders) {
    $targetDir = Join-Path 'android\app\src\main\res' $folder
    if (Test-Path $targetDir) {
        Copy-Item -Path $logoPath -Destination (Join-Path $targetDir 'ic_launcher.png') -Force
        Copy-Item -Path $logoPath -Destination (Join-Path $targetDir 'ic_launcher_round.png') -Force
        Copy-Item -Path $logoPath -Destination (Join-Path $targetDir 'ic_launcher_foreground.png') -Force
    }
}

$g.Dispose()
$bmp.Dispose()
$img.Dispose()

Write-Output "Successfully set Shaumya photo as logo and app icons!"
