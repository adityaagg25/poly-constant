# Polynomial Constant Finder

## 📌 Problem Statement
We are given polynomial roots in **JSON format**, where each root is expressed in a specific base (binary, octal, decimal, hexadecimal, etc.).  

The task is to:  
1. Parse the JSON input.  
2. Convert each root into a **decimal integer**.  
3. Use exactly **k roots** (where `k = degree + 1`) to form the polynomial.  
4. Compute the **constant term `c`** of the polynomial using **Vieta’s formula**:  

\[
c = (-1)^k \cdot (r_1 \times r_2 \times \dots \times r_k)
\]

---

## 📂 Repository Structure
poly-constant/

│── index.js # main program (computes constant term)

│── input.json # sample input 1 (small test case)

│── input2.json # sample input 2 (large test case)

│── README.md # this documentation


---

## ⚙️ How It Works
1. **Parse JSON**  
   Read `n` (total roots) and `k` (minimum required roots).  

2. **Convert Roots**  
   Each root has a `"base"` and `"value"`.  
   Convert to decimal (BigInt is used for large values).  

   Example:  
   ```json
   "2": { "base": "2", "value": "111" }
    → Decimal = 7

3. Select Roots
Take the first k roots (sorted by key).

4. Compute Constant
Multiply them and apply sign (-1)^k.

## 🚀 Run Instructions
1. **Clone repo**
git clone https://github.com/<your-username>/poly-constant.git
cd poly-constant

2. **Run program**
node index.js input.json


or for the large test:
node index.js input2.json

## 📝 Examples
**Example 1(small text case)**
Input (input.json):
Steps: 
1. Decode roots

"4" (base 10) → 4

"111" (base 2) → 7

"12" (base 10) → 12

"213" (base 4) → 39

So roots = [4, 7, 12, 39]

2.  Pick first k=3 roots
→ [4, 7, 12]

3. Apply Vieta’s formula

c=(−1)3⋅(4⋅7⋅12)=−336

Output: -336

Example 2 (large test case)

Input (input2.json):
(contains 10 roots, k=7 — see file in repo)

Output (constant term c):

-68251311922474227931291131263381395876233236117406283186409459444825993094514406289867143593522348021427278506790766073198900


(A 125-digit negative number — correct result for k=7 roots.)

## 📖 Notes

1. Program supports bases up to 36 (digits 0–9 and letters a–z).

2. Large integers are handled using BigInt in Node.js.

3. The program outputs only the constant term of the polynomial.

## ✅ Deliverables

index.js (solution code)

input.json, input2.json (sample test cases)

README.md (this file)

Console output screenshot (optional for submission)


--- 

