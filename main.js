// Wait for the HTML to be ready

document.addEventListener('DOMContentLoaded', () => {
  // 1) List of planets and gravity multipliers

  const planets = [
    ['Pluto', 0.06],
    ['Neptune', 1.148],
    ['Uranus', 0.917],
    ['Saturn', 1.139],
    ['Jupiter', 2.64],
    ['Mars', 0.3895],
    ['Moon', 0.1655],
    ['Earth', 1],
    ['Venus', 0.9032],
    ['Mercury', 0.377],
    ['Sun', 27.9],
  ];
  // 2) Grab elements
  const userWeightInput = document.getElementById('user-weight');
  const planetSelect = document.getElementById('planets');
  const output = document.getElementById('output');
  const button = document.getElementById('calculate-button');

  // 3) Populate <select> with planet options
  planets.forEach(([name, gravity]) => {
    const option = document.createElement('option');
    option.value = gravity;        // value = gravity
    option.textContent = name;     // text = planet name
    planetSelect.appendChild(option);
  });

  // 4) Function that calculates weight

  function calculateWeight(weight, planetName) {
    const match = planets.find(([name]) => name === planetName);
    if (!match) return NaN;
    const gravity = match[1];
    return weight * gravity;
  }
  // 5) Handle button click

  function handleClickEvent() {
    const userWeight = parseFloat(userWeightInput.value);
    if (isNaN(userWeight)) {
      output.textContent = 'Please enter a valid number for your weight.';
      return;
    }
    const planetName = planetSelect.options[planetSelect.selectedIndex].text;
    const gravity = parseFloat(planetSelect.value);
    const result = userWeight * gravity;
    // ✅ EXACT STRING the test expects
    output.textContent = `If you were on ${planetName}, you would weigh ${result.toFixed(2)}lbs!`;
  }
  // 6) Wire up the button
  button.addEventListener('click', handleClickEvent);
});