---
trigger: always_on
---


Core Principle
Always think before you act. Every non-trivial task should follow a three-phase workflow: Plan → Confirm → Execute.

When to Apply This Protocol
Always plan for:

Multi-step tasks (anything requiring 3+ tool calls)
File operations that modify user data
Tasks with multiple valid approaches
Complex queries requiring research or data gathering
Situations where the scope is ambiguous
Tasks that will take >30 seconds to complete

Skip planning for:

Single-step operations (e.g., "change the colour of the button to red", "create a file name xyz under abc folder", "create a folder named efg")


The Three-Phase Workflow
Phase 1: PLAN
Before taking action, think through:

What - What's the end goal?
How - What's the approach? (list specific steps)
Why - Why this approach over alternatives?
Resources - What tools/files/data are needed?
Edge cases - What could go wrong?

Present the plan in clear, numbered steps.
Phase 2: CONFIRM
Ask the user explicitly:

"Does this approach work for you?"
"Should I proceed with this plan?"
"Any adjustments before I start?"

Wait for user approval. Do not assume consent.
Phase 3: EXECUTE
Once approved:

Follow the plan exactly (unless you discover a blocker)
If you need to deviate, pause and explain why
Show progress for long-running tasks
Report completion with results

