/**
 * Calculate Settlement Amount for ONDC FIS Loan
 *
 * @param {number} principal       Loan Principal amount
 * @param {number} processingFee   Processing Fee
 * @param {number} loanTermMonths  Loan term in months
 * @param {number} bffPercent      Buyer Finder Fee (annualized %, e.g. 1 for 1%)
 * @param {"BAP"|"BPP"} collectorType   Who is the Processing Fee collector
 * @returns {number} Settlement Amount (rounded to 2 decimals)
 */
export function calculateSettlement(
    principal,
    processingFee,
    loanTermMonths,
    bffPercent,
    collectorType
  ) {
    // Step 1: Effective BFF % for loan term
    const termFraction = loanTermMonths / 12;
    const effectiveBffPercent = bffPercent * termFraction;
  
    // Step 2: BFF Amount (apply % on principal)
    const bffAmount = (principal * effectiveBffPercent) / 100;
  
    // Step 3: Settlement based on collector
    if (collectorType === "BAP") {
      // BAP keeps BFF → remits PF - BFF to BPP
      return parseFloat((processingFee - bffAmount).toFixed(2));
    } else {
      // BPP keeps PF → remits BFF to BAP
      return parseFloat(bffAmount.toFixed(2));
    }
  }
  