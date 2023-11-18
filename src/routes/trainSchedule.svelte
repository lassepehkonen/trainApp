<script>
    let tripDate = '';
    let cityStart = '';
    let cityEnd = '';
    let trains = [];
  
    function fetchData() {
      const userQuery = {
        'query': `
          {
            trainsByDepartureDate(
              departureDate: "${tripDate}",
              where: {
                and: [
                  { timeTableRows: { contains: { station: { shortCode: { equals: "${cityStart}" } } } } },
                  { timeTableRows: { contains: { station: { shortCode: { equals: "${cityEnd}" } } } } }
                ]
              },
              orderBy: { trainNumber: DESCENDING }
            ) {
            trainNumber
            timeTableRows(where: { or: [{ station: { shortCode: { equals: "${cityStart}" } } }, { station: { shortCode: { equals: "${cityEnd}" } } }] }) {
              station { name }
              scheduledTime
            }
            }
          }`
      };
  
      fetch('https://rata.digitraffic.fi/api/v2/graphql/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept-Encoding': 'gzip' },
        body: JSON.stringify(userQuery)
      })
      .then(response => response.json())
      .then(result => {
        trains = result.data.trainsByDepartureDate || [];
      })
      .catch(error => {
        console.error('Virhe haettaessa dataa:', error);
      });
    }
  
    function handleSubmit() {
      fetchData();
    }
  
    function formatTime(timeString) {
      const options = { hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'UTC' };
      const formattedTime = new Intl.DateTimeFormat('fi-FI', options).format(new Date(timeString));
      return formattedTime;
    }
  </script>
  
  <main>
    <form on:submit|preventDefault={handleSubmit}>
      <label for="tripDate">Matkustuspäivä:</label>
      <input type="date" bind:value={tripDate} id="tripDate" />
  
      <label for="cityStart">Lähtöasema:</label>
      <select type="text" bind:value={cityStart} id="cityStart">
        <option value="SK">Seinäjoki</option>
        <option value="OL">Oulu</option>
        <option value="ROI">Rovaniemi</option>
      </select>
  
      <label for="cityEnd">Päämääräasema:</label>
      <select type="text" bind:value={cityEnd} id="cityEnd">
        <option value="SK">Seinäjoki</option>
        <option value="OL">Oulu</option>
        <option value="ROI">Rovaniemi</option>
      </select>
  
      <button type="submit">Hae junia</button>
    </form>
  
    {#if trains.length > 0}
    <table>
        <thead>
          <tr>
            <th>Junan numero</th>
            <th>Lähtöasema</th>
            <th>Lähtöaika</th>
          </tr>
        </thead>
        <tbody>
          {#each trains as { trainNumber, timeTableRows }}
            {#if timeTableRows.length > 0}
              {#each timeTableRows as { station, scheduledTime }}
                <tr>
                  <td>{trainNumber}</td>
                  <td>{station.name}</td>
                  <td>{formatTime(scheduledTime)}</td>
                </tr>
              {/each}
            {:else}
              <tr>
                <td>{trainNumber}</td>
                <td colspan="2">Ei tietoja lähtö- ja saapumisasemista</td>
              </tr>
            {/if}
          {/each}
        </tbody>
      </table>
    {:else}
      <p>Ei junatietoja</p>
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
    select,
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
  
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  
    th, td {
      border: 1px solid #ddd;
      padding: 12px;
      text-align: left;
    }
  
    th {
      background-color: #007bff;
      color: white;
    }
  
    tr:nth-child(even) {
      background-color: #f2f2f2;
    }
  </style>

