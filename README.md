# F!ROSH 2T6 Tech Recruitment Coding Challenge

**Due Date:** 21/05/2026 (11:59 PM EST)

---

Thanks for your interest in joining the F!ROSH 2T6 Tech Team! We've prepared a short coding challenge to get a feel for how you approach problems, learn new things, and express yourself through code. There are no trick questions and no single right answer, we genuinely want to see what you build.

---

## Getting Started

1. **Fork this repo** and clone your fork to your local machine
2. **Make sure Node.js is installed** — download it at [nodejs.org](https://nodejs.org/en) if you haven't already
3. **Navigate to the project directory** in your terminal
4. Run `npm install` to install dependencies
5. Run `npm start` and visit [http://localhost:3000](http://localhost:3000) — you should see this placeholder page:
<img width="1919" height="1070" alt="image" src="https://github.com/user-attachments/assets/72533ab2-4ddc-49d4-b4a7-01923a1a8810" />


---

## Your Task

Build a **responsive, interactive Frosh Week Schedule Page** using React JS, CSS, and HTML.

The schedule data lives in `src/schedule_data.json` — it's already imported in `App.js` for you.

### Understanding the Data

The JSON is structured as an **object keyed by day name**, where each value is an array of events for that day:

```json
{
  "MONDAY AUGUST 26": [ ...events ],
  "TUESDAY AUGUST 27": [ ...events ],
  ...
}
```

Each event object can have the following fields:

| Field | Always present? | Description |
|---|---|---|
| `Event Name` | Yes | Name of the event |
| `Start Time` | Yes | Start time (see note below) |
| `End Time` | Yes | End time (see note below) |
| `Color` | Yes | One of: `purple`, `dark-purple`, `yellow`, `green`, `gray` |
| `Event Description` | No | A short description; some contain HTML (e.g. links) |
| `Event Location` | No | Where the event takes place |

**Heads up — time formats are inconsistent.** Some events use `"6:00 PM"` while others use a format like `"13:30:00 a1/p1"` (a spreadsheet export quirk — treat `a1` as AM and `p1` as PM). You'll need to decide how to display these gracefully.

### Requirements

Your page must:

- **Display all events** across all 5 days in a clean, readable layout
- **Highlight the color** — events are tagged with a `Color` value (`purple`, `dark-purple`, `yellow`, `green`, `gray`); use this to visually distinguish event types
- **Be visually creative** — this is a Frosh Week page, we want to see your creativity. Have fun with it! We have provided some assets from previous years under the assets folder, you are free to use them or add your own assets!

### Not a React expert yet? That's completely fine.

We're not expecting polished senior-dev code. We want to see how quickly you can pick something up, make decisions, and ship something real. Google liberally, read the docs, use AI (more on that below), that's exactly what working on a tech team looks like.

---

## AI Usage Declaration

You're welcome to use AI tools (ChatGPT, Claude, GitHub Copilot, Codex, Antigravity etc.) while working on this challenge. Seriously, go for it, we use them too.

**The one rule: declare it honestly in your PR description.**

We've included an AI Usage Declaration section in the PR template. Fill it out truthfully: what tools you used, how you used them, and what you changed or reviewed afterward. We're not judging you for using AI. We *are* looking for honesty and self-awareness. We want to see how creative and smart you can be with your AI use.

---

## Submission

1. Commit your changes to your forked repo
2. Open a **Pull Request** back to this repo
3. Fill out the **PR template** completely (including the AI Usage Declaration)
4. Applications are reviewed on a rolling basis. Submit by 21/05/2026, 11:59 PM EST to be considered

---
You’ve reached the end of the coding challenge!

Good luck!
