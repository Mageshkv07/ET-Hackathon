# ET-Hackathon

# Suraksha Safety Intel 🛡️
### AI-Powered Industrial Safety Intelligence Platform

Suraksha Safety Intel is an agentic, multi-layered industrial safety system designed to fuse IoT/SCADA sensor readings, worker telemetry, digital Permit-to-Work logs, and regulatory databases (OISD / Factory Act) into a real-time predictive risk canvas.

## Key Features
1. **Command Center Dashboard**: Visualizes overall plant health, sensor telemetry, and live alerts.
2. **Geospatial Heatmap**: Interactive plant layout detailing active worker coordinates, sensor spots, and active permits.
3. **Compound Risk Detection Engine**: Flags dangerous overlapping risks (e.g. SIMOPs - Simultaneous Operations).
4. **Digital Permit Intelligence**: Evaluates work permit safety scores dynamically against current environmental conditions.
5. **RAG-Powered Incident Pattern Intel**: Search and retrieve safety guidelines (OISD/Factory Act) and historical case studies.
6. **Emergency Response Orchestrator (ERO)**: Automates evacuation routing, worker count, PA alarms, and generates regulatory compliance reports.
7. **Compliance Audit scorecards**: Monitors statutory standards and generates CAPA workflows.
8. **Multi-Agent Chat Interface**: Simulates conversation with safety AI agents (SCADA, PTW, Compliance, ERO).
9. **Interactive Pitch Deck**: Integrates the presentation deck and architectural diagram directly in-app.

## How to Run
Since this application is fully client-side and self-contained, no local installation (Node.js/Python) is needed:
1. Open the project folder.
2. Double-click `index.html` to open it in any modern web browser.
3. Use the **Scenario Selector** at the top right to toggle between routine operations, SIMOP conflicts, and evacuation scenarios.

## Project Structure
- `index.html`: Holds the page structure, tab views, modal dialogue configurations.
- `styles.css`: Implements glassmorphism dark-mode UI, custom animations (pulses, alert banners, map icons), layout system.
- `app.js`: Simulates state, scenario transitions, dynamic SVG rendering, permit scoring algorithms, incident-retrieval engine.
