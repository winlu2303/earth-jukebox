# 🌍 Earth Jukebox

**Turn NASA Data into Music**

A sonification platform that transforms Earth observation data into music. Built for the **NASA Space Apps Challenge 2026** by **MindWave**.

---

## 🎯 What It Does

Earth Jukebox converts **colors** in NASA satellite visualizations into **musical notes**. Each color becomes a different instrument:

| Color | Instrument | Meaning |
|-------|-----------|---------|
| 🔴 Red | Bass | High values |
| 🟠 Orange | Piano | Medium values |
| 🟡 Yellow | Strings | Background |
| 🟢 Green | Flute | Low values |
| 🔵 Blue | Cello | Minimum |
| 🟣 Purple | Synth | Anomaly |
| ⚪ White | Bells | Peak |

This makes complex Earth science **accessible** to:
- Blind and visually impaired users
- Auditory learners
- Anyone who wants to **feel** climate data

---

## 🌐 Data Sources

All data from **NASA GMAO** (Global Modeling and Assimilation Office):

- **CO** (Carbon Monoxide)
- **Temperature**
- **PM2.5** (Particulate Matter)
- **Wind**
- **O3** (Ozone)
- **Precipitation**
- **NO2** (Nitrogen Dioxide)

Source: [NASA SVS Earth Now Dashboard](https://svs.gsfc.nasa.gov/gallery/earth-now-dashboard/)

---

## 🛠️ Tech Stack

- **Python** — data analysis + sonification (OpenCV, NumPy, Mido)
- **FluidSynth** — MIDI to audio rendering
- **FFmpeg** — video + audio synchronization
- **React + Vite** — web interface
- **Tailwind CSS** — styling

---

## 🚀 How to Run

### Prerequisites

- Node.js 18+
- Python 3.10+
- FluidSynth
- FFmpeg

### Install

```bash
# Clone repo
git clone <your-repo-url>
cd earth-jukebox

# Install dependencies
npm install

# Run
npm run dev

# Open 
http://localhost:5173

# Project Structure

earth-jukebox/
├── public/videos/          # 7 final MP4 files with sonification
├── src/
│   ├── components/
│   │   ├── DatasetButton.jsx
│   │   ├── VideoPlayer.jsx
│   │   └── Legend.jsx
│   ├── App.jsx
│   └── index.css
└── README.md

# How Sonification Works
Extract frames from NASA video (372 frames @ 12 fps)
Analyze colors in each frame (count pixels per color)
Map colors → notes (7 colors = 7 instruments)
Generate MIDI with 7 tracks
Render audio with FluidSynth
Sync audio + video with FFmpeg

# Team MindWave
Sofia-Luna Winter

NASA Space Apps Challenge 2026
Eindhoven Local Event
