// Mocked AI response for development and testing
export const getSolution = async (problem) => {
  return JSON.stringify({
    problem,
    low_cost_fix: ["Check battery connection", "Refuel if empty", "Inspect spark plug"],
    advanced_fix: ["Replace ignition coil", "Check wiring harness"],
    estimated_cost: "$10 - $100",
    avoid_if_possible: "Do not attempt to disassemble engine without experience.",
    need_professional: false
  });
};
