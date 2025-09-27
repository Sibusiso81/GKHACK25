import { GoogleGenAI } from "@google/genai"
import type { FarmerInput } from "../utils/supabse/types"

export async function main(farmer: FarmerInput) {
  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY!,
  })

  const model = "gemini-2.5-flash"

  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `You are an **expert agricultural advisor** with specialized knowledge of **Sri Lankan farming, climate, soil conditions, and market economics**. Your goal is to provide a detailed, strategic farming plan based on the farmer's inputs.

**FARMER INPUTS (Use these exact values in your analysis):**

1.  **Location (District):** ${farmer.location ?? "Not specified"}
2.  **Planting Month (Desired):** ${farmer.plantingMonth ?? "Not specified"}
3.  **Crop Maturity Time (Desired):** ${farmer.cropMaturityTime ?? "Not specified"}
4.  **Financial Capital (Farmer's Budget):** ${farmer.financialCapital ?? "Not specified"}
5.  **Area of the Land (Size):** ${farmer.areaOfLand ?? "Not specified"} 
6.  **Soil Type (Given):** ${farmer.soilType ?? "Not specified"}
7.  **Topography of the Land:** ${farmer.topographyOfLand ?? "Not specified"}
8.  **Water Source:** ${farmer.waterSource ?? "Not specified"}
9.  **Water Availability:** ${farmer.waterAvailability ?? "Not specified"}
10. **Number of Labors:** ${farmer.numberOfLabors ?? "Not specified"} 
11. **Objectives of the Farmer:** ${farmer.objectivesOfFarmer ?? "Not specified"}

**INSTRUCTIONS FOR RESPONSE (CRITICAL):**

1.  **Output Format:** Return the entire response as a single, valid **JSON array of objects**.
2.  **Content Requirement:** The array **must** contain exactly eight (8) objects, one for each "title" listed below.
3.  **Language:** Use clear, simple, and direct language suitable for a local farmer, but include specific technical terms (e.g., fertilizer grades, soil pH, specific irrigation methods) where they are essential for effective farming.
4.  **Prediction Basis:** The analysis must reference Sri Lankan seasons (Maha/Yala), common local crops, and known soil/climate challenges for the specified district.
5.  **NO Text Outside JSON:** Do not include any introductory text, concluding remarks, or explanations outside the opening [ and closing ] of the JSON array.

**REQUIRED JSON STRUCTURE (Provide a detailed and specific 'description' for each 'title'):**


[
  {
    "title": "Estimated Yield & Crop Suitability",
    "description": "Based on the inputs, the optimal crop is [Suggested Crop]. Predicted yield for this crop: [Low estimate] to [High estimate] per [Hectare/Acre]. Assumptions for this prediction (e.g., use of recommended fertilizer, average rainfall in Maha/Yala season, pest control)."
  },
  {
    "title": "Optimal Planting & Practice Guide",
    "description": "Advice on the best planting month (confirming or adjusting the farmer's desired month) and specific planting methods (e.g., spacing, line planting, nursery care) that maximize efficiency for the chosen crop, soil, and topography."
  },
  {
    "title": "Soil and Fertilizer Guidance",
    "description": "Specific NPK fertilizer grades and quantities (e.g., Urea, TSP, MOP) required for the suggested crop and soil type. Recommendations for soil amendments (e.g., lime, organic matter) and timing of application."
  },
  {
    "title": "Water Management Plan",
    "description": "A clear irrigation schedule (e.g., days per week, volume) based on the water source and availability. Practical water-saving techniques (e.g., mulching, drip irrigation suitability) relevant to the given topography and climate."
  },
  {
    "title": "Labor and Cost Planning",
    "description": "A breakdown of the labor intensity for the suggested crop (e.g., Land Prep, Weeding, Harvesting). Advice on how to allocate the ${
      farmer.numberOfLabors ?? "number"
    } laborers efficiently and suggestions for cost-effective practices given the ${
      farmer.financialCapital ?? "amount"
    } financial capital."
  },
  {
    "title": "Harvest Timing & Market Insights",
    "description": "An assessment of whether the desired Crop Maturity Time is realistic. Suggest the optimal harvest timing for maximum market value, and briefly list 1-2 major market considerations (e.g., expected price in the harvest month, storage needs)."
  },
  {
    "title": "Risk Assessment & Mitigation",
    "description": "Identify the top 3 key risks for the suggested crop in the specified district (e.g., specific pests, drought, flooding). Provide 1-2 practical, low-cost mitigation strategies for each risk."
  },
  {
    "title": "Alternative Suggestions (If Needed)",
    "description": "If the primary crop's yield or profit potential is deemed low due to the inputs (e.g., low water, poor soil match), suggest 1-2 alternative, more resilient crops (e.g., substitute paddy with coarse grains or yams) and briefly explain why."
  }
]`,
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
