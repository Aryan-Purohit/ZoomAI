# ZoomAI Proctoring System

ZoomAI is an innovative proctoring solution that combines Zoom's Web SDK and AI-based fairness reporting to ensure secure, transparent, and efficient online examinations. It monitors real-time video streams to detect and log suspicious behaviors, enforces lockdown browser features, and provides detailed fairness reports.

## Features

- **AI Monitoring:** Detects suspicious behaviors like tab switching, looking away, multiple faces, and unusual sounds.
- **Lockdown Browser Functionality:** Disables context menus, blocks keyboard shortcuts, and monitors tab activity.
- **Zoom Integration:** Directly integrates with Zoom meetings using Zoom Web SDK.
- **Fairness Reporting:** Provides detailed logs and explanations of flagged events for transparency.

## Installation

### Requirements

- Node.js (latest stable version recommended)
- React.js
- Zoom API Key and Secret (Zoom Developer Account Required)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/Aryan-Purohit/ZoomAI.git
```

2. Navigate into the project:
```bash
cd ZoomAI
```

3. Install dependencies:
```bash
cd server && npm install
cd ../client && npm install
```

4. Create `.env` file inside `server` directory with your Zoom credentials:
```env
ZOOM_API_KEY=your_zoom_api_key
ZOOM_API_SECRET=your_zoom_api_secret
PORT=5005
```

## Running the Application

1. **Start Server:**
```bash
cd server
npm start
```

2. **Start Client:** (Open a new terminal window)
```bash
cd client
npm start
```

3. Open your browser at `http://localhost:3000`.

## Usage

- Upon launching, the system automatically joins the predefined Zoom meeting.
- The lockdown browser features activate immediately, disabling shortcuts and monitoring browser activity.
- AI monitoring logs any suspicious behavior during the session.

## License

MIT License

---

**Made for Zoom Hackathon 2025**
