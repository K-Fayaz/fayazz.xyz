# Check it out here
https://fayazzz-274430993175.us-central1.run.app/

## Features

### Creative 404 Page
- **Song Player**: After staying on the 404 page for 45 seconds, a song player appears with a fun message
- **Session Memory**: Once dismissed or played, the song won't show again in the same browser session
- **Smooth Animation**: The audio player fades in with a beautiful animation

#### To add your song:
1. Place your audio file (MP3, WAV, etc.) in the `src/assets/` folder
2. Update the `src` attribute in `NotFoundPage.tsx` line 67:
   ```tsx
   <source src="/src/assets/your-song.mp3" type="audio/mpeg" />
   ```
   Replace `your-song.mp3` with your actual filename
