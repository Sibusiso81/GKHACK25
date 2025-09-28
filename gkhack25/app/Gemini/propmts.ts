import { GoogleGenAI } from "@google/genai"

export async function main() {
  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY!,
  })

  const model = "gemini-2.5-flash"

  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `You are an **expert agricultural epidemiologist** with specialized knowledge of **South African poultry farming, Newcastle Disease (ND) outbreaks, vaccine distribution systems, and market dynamics**. Your goal is to provide a detailed, data-driven outbreak and vaccine allocation plan based on real-time analytics for Johannesburg, South Africa.

**BASE CONTEXT (Use these exact values in your analysis):**

1. **Location (City):** Johannesburg, South Africa
2. **Disease Focus:** Newcastle Disease (ND)
3. **Objective:** Forecast outbreaks, track vaccine inventory, and optimize vaccine allocation in the region.

**INSTRUCTIONS FOR RESPONSE (CRITICAL):**

1. **Output Format:** Return the entire response as a single, valid **JSON array of objects**.
2. **Content Requirement:** The array **must** contain exactly eight (8) objects, one for each "title" listed below.
3. **Language:** Use clear, simple, and direct language suitable for farmers, suppliers, and government officials, but include specific technical terms (e.g., R0 values, cold-chain logistics, predictive modeling methods).
4. **Prediction Basis:** The analysis must reference South African poultry conditions, urban-rural supply chain issues in Gauteng, and lessons from recent ND outbreak patterns.
5. **NO Text Outside JSON:** Do not include any introductory text, concluding remarks, or explanations outside the opening [ and closing ] of the JSON array.

**REQUIRED JSON STRUCTURE (Provide a detailed and specific 'description' for each 'title'):**

[
{
"title": "Real-Time Outbreak Trends",
"description": "Summarize the current Newcastle Disease outbreak signals in Johannesburg and nearby Gauteng districts. Include reference to seasonal risks, poultry density, and event-based surveillance data."
},
{
"title": "Predictive Outbreak Modeling",
"description": "Forecast likely ND outbreak hotspots in the next 3-6 months using poultry density, climate factors (rainfall, temperature), and past outbreak cycles. Provide estimated probabilities or risk zones."
},
{
"title": "Vaccine Demand Forecast",
"description": "Estimate vaccine demand for Johannesburg based on poultry population data, outbreak risk levels, and typical vaccination coverage rates. Include a low-to-high range of vials required."
},
{
"title": "Inventory & Supply Chain Status",
"description": "Describe current ND vaccine stock levels, distribution bottlenecks (e.g., cold-chain transport, storage), and risks of depletion. Highlight any urgent resupply needs."
},
{
"title": "Optimized Allocation Strategy",
"description": "Provide a step-by-step allocation plan to distribute vaccines efficiently across high-risk farms and districts. Consider equity for smallholder farmers and commercial operations."
},
{
"title": "Government & Supplier Coordination",
"description": "Outline how suppliers, veterinary services, and government should coordinate in Johannesburg to avoid shortages. Mention communication channels, reporting duties, and compliance under the Animal Diseases Act."
},
{
"title": "Risk Assessment & Mitigation",
"description": "Identify top 3 risks to vaccine supply and outbreak control (e.g., cold-chain failure, transport delays, sudden outbreak spikes). Provide mitigation steps for each risk."
},
{
"title": "Alternative Emergency Measures",
"description": "If vaccine shortages occur, recommend emergency actions (e.g., ring vaccination, movement restrictions, rapid import of doses). Explain how these measures reduce risk in Johannesburg."
}
]
`,
        },
      ],
    },
  ]

  const response = await ai.models.generateContent({
    model,
    contents,
  })

  // The model should return JSON as a string
  let text = response?.text

  if (text) {
    // Remove backticks and any markdown formatting
    text = text
      .replace(/```json\s*/g, "")
      .replace(/```\s*/g, "")
      .replace(/`/g, "")

    // Find the first '[' and last ']' to extract just the JSON array
    const firstBracket = text.indexOf("[")
    const lastBracket = text.lastIndexOf("]")

    if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
      // Extract only the JSON array part
      text = text.substring(firstBracket, lastBracket + 1)
    }

    // Clean up any remaining whitespace
    text = text.trim()

    try {
      // Parse and return the JSON array
      const parsedData = JSON.parse(text)
      return parsedData
    } catch (err) {
      console.error("⚠️ Could not parse JSON, raw output:", text)
      console.log(err)
      // Return the cleaned text if parsing fails
      return text
    }
  }

  return null
}
