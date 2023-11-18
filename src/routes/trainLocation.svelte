<script>
    import { onMount } from 'svelte';
    const url = 'https://rata.digitraffic.fi/api/v2/graphql/graphql';
    let trains = [];
    let trainNumber = null;
    let trainLocation = null;
  
    function fetchData() {
      const q1 = {
        'query': `
          {
            currentlyRunningTrains(where: { trainNumber: { equals: ${trainNumber} } }) {
              trainNumber
              trainLocations(where: { speed: { greaterThan: 30 } }, orderBy: { timestamp: DESCENDING }, take: 1) {
                speed
                timestamp
                location
              }
            }
          }`
      };
  
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept-Encoding': 'gzip' },
        body: JSON.stringify(q1)
      })
        .then(response => response.json())
        .then(result => {
          trains = result.data.currentlyRunningTrains || [];
          trainLocation = trains.length > 0 ? trains[0].trainLocations[0] : null;
        })
        .catch(error => {
          console.error('Virhe haettaessa dataa:', error);
        });
    }
  
    function handleSubmit() {
      fetchData();
    }
  
    onMount(fetchData);
  </script>
  
<main>
    <form on:submit|preventDefault={handleSubmit}>
      <label for="trainNumber">Junan numero:</label>
      <input type="number" bind:value={trainNumber} id="trainNumber" />
  
      <button type="submit">Hae junia</button>
    </form>
  
    {#if trainLocation}
      <h3>Junan sijainti:</h3>
      <p><strong>Junan numero:</strong> {trainNumber}</p>
      <p><strong>Nopeus:</strong> {trainLocation.speed} km/h</p>
      <p><strong>Aikaleima:</strong> {trainLocation.timestamp}</p>
      <p><strong>Sijainti:</strong> {trainLocation.location}</p>
    {:else if trains.length === 0}
      <p>Kyseinen juna ei ole liikkeellä juuri nyt.</p>
    {/if}

</main>

<style>
    main {
      font-family: 'Arial', sans-serif;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      background-color: #f8f8f8;
      padding: 20px;
      border-radius: 8px;
    }
  
    form {
      margin-bottom: 20px;
      padding: 20px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  
    label {
      display: block;
      margin-bottom: 8px;
      font-weight: bold;
    }
  
    input,
    button {
      width: 100%;
      padding: 10px;
      margin-bottom: 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }
  
    button {
      background-color: #007bff;
      color: white;
      cursor: pointer;
    }

  </style>
