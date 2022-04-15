import { useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import History from "./History";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@mui/material/Autocomplete";


  const Search = ({panTo}) => {
    const [historyList, setHistoryList] = useState([]);
    const addHistory = (option) => {
      setHistoryList([...historyList, option]);
  
  }
    const {
      suggestions: { data },
      setValue,
    } = usePlacesAutocomplete({
      requestOptions: {
        location: { lat: () => 3.139, lng: () => 101.6869 },
        radius: 200 * 1000,
      },
    });
  
    console.log(data);

    const geoCode = ({description}) => {
      console.log(description);
      getGeocode({ address: description })
        .then((results) => getLatLng(results[0]))
        .then((latLng) => {
          const { lat, lng } = latLng;
  
          console.log("Coordinates: ", { lat, lng });
          //re-center the map to this location
          panTo({ lat, lng });
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    }
  
    return (
      <div className="search">
        <History className='history' 
        historyList={historyList}
        options={data}
        getOptionLabel={(option) => option.description}
        onClick = {(event, historyList) => {
          geoCode(historyList);
        }} />
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={data}
          getOptionLabel={(option) => option.description}
          onChange={(event, option) => {
            //returns the selected option
            console.log(option);
            geoCode(option);
            addHistory(option);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search input"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          )}
        />
      </div>
    );
  }

export default Search;