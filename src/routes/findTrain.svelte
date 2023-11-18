<script>
    const url = 'https://rata.digitraffic.fi/api/v2/graphql/graphql';
    let stationName = ""
    let scheduledTime = ""
    let trainNumberResult = "";
  
    function fetchData() {
      const q1 = {
        'query': `{
          trainsByDepartureDate(departureDate: "${date}", where: {and: [{trainNumber: {equals: ${trainId}}}, {timeTableRows: {contains: {station: {shortCode: {equals: "${station}"}}}}}]}) {
            trainNumber
            timeTableRows(where: {station: {shortCode: {equals: "${station}"}}}) {
              station {
                name
              }
              scheduledTime
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
          const trainData = result.data.trainsByDepartureDate[0];

          if (trainData) {
            stationName = trainData.timeTableRows[0].station.name;
            scheduledTime = formatTime(trainData.timeTableRows[0].scheduledTime);
            trainNumberResult = trainData.trainNumber;

          } else {
            document.getElementById('stationResult').innerText = 'Tietoja ei löytynyt.';
            document.getElementById('timeResult').innerText = '';
          }
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

    let date = '';
    let station = '';
    let trainId = null;
  </script>
  
<main>
    <form on:submit|preventDefault={handleSubmit}>
      <label for="date">Päivä:</label>
      <input type="date" bind:value={date} id="date" />
  
      <label for="station">Asema:</label>
      <select type="text" bind:value={station} id="station">
        <option value="SK">Seinäjoki</option>
        <option value="OL">Oulu</option>
        <option value="ROI">Rovaniemi</option>
      </select>
  
      <label for="trainId">Junan numero:</label>
      <input type="trainId" bind:value={trainId} id="trainId" />
  
      <button type="submit">Hae!</button>
    </form>
  
    <div id="resultContainer">
      <h3 id="trainNumberResult">{trainNumberResult}</h3>
      <h3 id="stationResult">{stationName}</h3>
      <h3 id="timeResult">{scheduledTime}</h3>
    </div>
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
    display: flex;
    flex-direction: column;
    align-items: center;
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

  #resultContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h3 {
    margin-bottom: 8px;
    color: #007bff;
  }
</style>