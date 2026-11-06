# Build spec: Trail Club unit economics

*Example output for Module 5, made with the build-spec-writer skill from prototype-example-unit-economics.html. Fictional company, made-up data.*

**Who it's for:** Ridgeway Trail Co.'s leadership team, deciding the Trail Club subscription price.

**What it does:** Shows whether a Trail Club member is worth what it costs to win them, for any price, margin, churn and acquisition cost.

**Inputs:**

| Input | Unit | Default | Valid range |
| --- | --- | --- | --- |
| Monthly price | $ per member per month | 49 | above 0 |
| Gross margin | % of price | 72 | above 0, up to 100 |
| Monthly churn | % of members per month | 3 | above 0, up to 100 |
| Acquisition cost (CAC) | $ per member | 239 | above 0 |

**Outputs:**

| Output | How it's calculated | Explanation shown |
| --- | --- | --- |
| Gross profit per member per month | price × gross margin, in dollars and cents | "Price × gross margin." |
| Lifetime value (LTV) | gross profit per month ÷ monthly churn, whole dollars | "Gross profit per month ÷ monthly churn." |
| LTV / CAC | LTV ÷ CAC, one decimal, rounded down | "How many times a member pays back what it cost to win them. 3 or more is a common target." |
| Months to pay back CAC | CAC ÷ gross profit per month, one decimal | "CAC ÷ gross profit per month." |

**Edge cases and rules:**
- If LTV/CAC is below 3, show the ratio in red and the warning "LTV/CAC is below 3: each new member doesn't earn back enough of what it cost to win them."
- If churn is 0 or blank, show "Churn must be above 0 to estimate lifetime value." instead of LTV, LTV/CAC and payback. Never show "Infinity" or "NaN".
- Same for price, margin and CAC: a clear message for 0, blank or out-of-range values.

**Constraints:**
- Plain HTML, CSS and JavaScript, with no outside libraries.
- One screen that works on a phone.
- Example data pre-filled and labeled "Example data, made up".
- No real company data, no passwords and no API keys anywhere in the files.

**Files:** index.html (page), style.css (look), app.js (calculations), README.md (what it is and how to open it).

**Acceptance checks:**
1. With the default inputs, gross profit shows $35.28, LTV shows $1,176, LTV/CAC shows 4.9 and payback shows 6.8 months. No warning.
2. With churn at 5% (other inputs default), LTV/CAC shows 2.9 in red and the warning appears.
3. With churn at 0, the message "Churn must be above 0 to estimate lifetime value." appears, and no result shows "Infinity" or "NaN".
4. On a phone-width screen (375 px), nothing runs off the side.

**Later:** compare two prices side by side; save scenarios.

**Before writing code:** show a plan and file list and wait for my OK.
