// src/utils/calculateAPICost.ts

/**
 * Calculates the cost of API usage based on the number of tokens and the model used.
 * @param {string} model - The model name used for the API call.
 * @param {number} promptTokens - The number of tokens used in the prompt.
 * @param {number} completionTokens - The number of tokens used in the completion.
 * @returns {object} An object containing the input cost, output cost, and total cost.
 */
export function calculateAPICost(model: string, promptTokens: number, completionTokens: number): any {
    const tokenPrices = {
        "gpt-4": { input: 30, output: 60 },
        "gpt-4-32k": { input: 60, output: 120 },
        "gpt-3.5-turbo-0125": { input: 0.50, output: 1.50 },
        "gpt-3.5-turbo-instruct": { input: 1.50, output: 2.00 }
    };

    const pricePerToken = tokenPrices[model] || tokenPrices["gpt-3.5-turbo-0125"]; // default to a model if not specified

    const totalInputCost = (promptTokens / 1000000) * pricePerToken.input;
    const totalOutputCost = (completionTokens / 1000000) * pricePerToken.output;
    const totalCost = totalInputCost + totalOutputCost;

    return {
        totalInputCost: totalInputCost,
        totalOutputCost: totalOutputCost,
        totalCost: totalCost
    };
}
