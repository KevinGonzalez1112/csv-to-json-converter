import './App.scss';

const CSVToJSON = () =>
{
  // Get the CSV input from the textarea and replace newlines with a delimiter

  const csvInput = document.getElementById("csvInput").value.replace(/\n/g, "/").split("/");;

  // Take the first row as headers and split it by commas to get the keys 

  const headers = csvInput[0].split(",");

  // Create a slice to get only the data rows, splitting each row by commas

  const dataRows = csvInput.slice(1).map(row => row.split(","));

  // Map the data rows to an array of objects, using the headers as keys

  const jsonOutput = dataRows.map(row => 
  {
    return headers.reduce((obj, header, index) => 
    {
      obj[header.trim().replace(/^"(.*)"$/, '$1')] = row[index] ? row[index].trim().replace(/^"(.*)"$/, '$1') : null;

      return obj;
    }, {});
  })

  // Convert the JSON output to a string and display it in the textarea

  document.getElementById("jsonOutput").value = jsonOutput.length > 0 ? JSON.stringify(jsonOutput, null, 2) : "No data to convert";

  // Finally, return the JSON output for potential further use

  return jsonOutput;
}

const downloadJSON = () =>
{
  // Run the CSV to JSON conversion function to get the JSON data

  const jsonData = CSVToJSON();

  // Add a check to ensure that jsonData is not empty before proceeding with the download

  if (!jsonData || jsonData.length === 0) 
  {
    alert("No data to download. Please convert CSV to JSON first.");
    
    return;
  }

  // Convert the JSON data to a string

  const jsonString = JSON.stringify(jsonData, null, 2);

  // Create a Blob from the JSON string

  const blob = new Blob([jsonString], { type: "application/json" });

  // Create a link element to trigger the download

  const url = URL.createObjectURL(blob);

  // Create an anchor element and set its href to the Blob URL

  const a = document.createElement("a");
  a.href = url;

  // Set the download attribute to specify the filename

  a.download = "converted_data.json";
  
  // Append the link to the body and trigger a click to download

  document.body.appendChild(a);
  a.click();

  // Remove the link from the document and revoke the object URL

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function App() 
{
  return (
      <div className = 'main-container'>

        <h1> CSV to JSON Converter </h1>

        <h2> Simple Data Converter built using React. </h2>

        <div className = 'input-container'>
          <textarea id = "csvInput" placeholder = "Enter CSV data here" />
        </div>

        <div className = 'buttons'>
          <button id = "convertButton" onClick = { CSVToJSON }> Convert to JSON </button>
        </div>

        <div className = 'output-container'>
          <textarea id = "jsonOutput" placeholder = "JSON Output will appear here" />
        </div>

        <div className = 'buttons'>
          <button id = "downloadButton" onClick = { downloadJSON }> Download JSON File </button>
        </div>

      </div>   
  );
}

export default App;
