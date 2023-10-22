import Mathlib.Logic.Basic -- basic facts in logic
import Mathlib.Tactic.LibrarySearch -- a tactic which searches for
-- theorems in Lean's mathematics library

-- Let P and Q be true-false statements
variable (P Q : Prop)

-- The following is a basic result in logic
example : ¬ (P ∧ Q) ↔ ¬ P ∨ ¬ Q := by
  -- its proof is already in Lean's mathematics library
  exact not_and_or

-- Here is another basic result in logic
example : ¬ (P ∨ Q) ↔ ¬ P ∧ ¬ Q := by
  library_search -- we can search for the proof in the library
  -- we can also replace `library_search` with its output
