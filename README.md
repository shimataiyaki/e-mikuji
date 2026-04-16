# binary-omikuji Technical Summary

## 1. Overview
- **Title**: binary-omikuji
- **Release Date**: April 2026
- **Public URL**: [https://shimataiyaki.github.io/binary-omikuji/]
- **Repository**: [https://github.com/shimataiyaki/binary-omikuji]

## 2. Development Background

### 2.1 Concept and Purpose
- This project was developed as a **“personal project that can also be repurposed for club activity exhibitions”**.
- While envisioning its use in exhibitions at cultural festivals for IT-related clubs, the priority was initially on refining the project’s quality as a personal portfolio.
- Although actual operational testing is still pending, the design—which relies on a standalone static site and integrates with physical paper cards—is expected to prevent network overload and equipment malfunctions on the day of the event.

### 2.2 Prototyping Evolution
- **V1 (Minimal Configuration)**: For verifying the technical feasibility of the concept
- **v1 (Minor Update)**: A version with slight modifications to v1
- **v3 (UI Homage)**: Implemented card designs inspired by the Japanese-style UI of Koi Mikuji v3.
- **v4 (Minor Update)**: A version with minor changes to v3

## 3. Technologies Used
- **Frontend**: HTML5, CSS3, JavaScript (ES6)
- **Hosting**: GitHub Pages
- **Editor**: VS Code / Cursor (AI-assisted development)
- **Design**: Hand-drawn sketches

## 4. System Architecture Diagram

[Chromebook] → [GitHub Pages] → [Random draw in browser]
↓
[Club members hand out paper cards]

## 5. Technical Explanation
## 5.1 Development Process and Lessons Learned
- **Practicing Vibe Coding**: This project was created using the **Vibe Coding** approach, which involves coding through dialogue with AI. By shaping the impressions gained from the Love Fortune Telling UI through dialogue with AI, I confirmed that even as an individual developer, it is possible to achieve a high level of completion in a short period of time.
### 5.2 Random Selection Logic
- A simple random selection using JavaScript’s `Math.random()`.
- Defined 16 types of binary numbers from `0000` to `1111` in an array.
- **Anti-spam**: Disabled the button during the selection process and implemented a 2.5-second wait effect using `setTimeout`.

### 5.3 UI/UX (Homage to Koi mikuji: Love Fortune Telling)
- **Card Design**: Achieved vertical text and hover animations using only CSS. Used `writing-mode: vertical-rl`.
- **Responsive Design**: Used Flexbox to ensure cards wrap and center on mobile devices.

### 5.4 Operational Design
- **Integration of Web and Physical Elements**: Fortune results are not displayed on the screen; only binary code is shown.
- **Club members hand out paper cards based on a reference chart**, creating a mechanism that guarantees conversation.

## 6. Development Challenges and Solutions
| Challenge | Solution |
| :--- | :--- |
| Concerns about network load on the day of the event | Eliminated server-side processing and implemented a static site (GitHub Pages) |
| Display issues on smartphones | Optimized font sizes using viewport settings and media queries |

## 6. Future Outlook
- Through the actual cultural festival exhibition, we plan to identify operational challenges (such as paper card inventory management and optimal wait times) and work on improvements.
- Omikuji result aggregation feature (integrated with Google Apps Script)

## 7. Acknowledgments / Inspiration
- The UI for this project was independently implemented based on inspiration from “Koi Mikuji v3” [https://koi-mikuji.omikuji-do.com/v3/].

Translated with DeepL.com (free version)
