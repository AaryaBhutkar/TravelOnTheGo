import React, { useState } from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

// Custom styled components
const FilterButton = styled(Button)(({ theme, active }) => ({
  backgroundColor: active ? '#EEF2FF' : '#fff',
  color: active ? '#4F46E5' : '#666',
  border: `1px solid ${active ? '#E0E7FF' : '#E5E7EB'}`,
  textTransform: 'none',
  padding: '6px 16px',
  marginRight: '8px',
  '&:hover': {
    backgroundColor: active ? '#EEF2FF' : '#F9FAFB',
    border: `1px solid ${active ? '#E0E7FF' : '#E5E7EB'}`,
  }
}));

const CustomSlider = styled(Slider)(({ theme }) => ({
  width: '94%', // Reduced width to prevent cutoff
  margin: '0 auto', // Center the slider
  '& .MuiSlider-rail': {
    opacity: 0.5,
  },
}));

const FilterButtons = ({ onChangeFilters, filters }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [costValue, setCostValue] = useState(500);
  const [peopleValue, setPeopleValue] = useState(1);
  const [isDaySelected, setIsDaySelected] = useState(true);
  const [isNightSelected, setIsNightSelected] = useState(false);

  const handleCostChange = (event, newValue) => {
    setCostValue(newValue);
  };

  const handlePeopleChange = (event, newValue) => {
    setPeopleValue(newValue);
  };

  const applyFilters = () => {
    const timeFilters = [];
    if (isDaySelected) timeFilters.push("Day");
    if (isNightSelected) timeFilters.push("Night");
    
    const updatedFilters = {
      ...filters,
      cost: costValue,
      people: peopleValue,
      time: timeFilters
    };
    
    onChangeFilters(updatedFilters);
    setShowMenu(false);
  };

  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          showMenu ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Filters</h2>
            <IconButton onClick={() => setShowMenu(false)} size="small">
              <CloseIcon />
            </IconButton>
          </div>

          <div className="space-y-6 flex-1 overflow-y-auto">
            <section>
              <h3 className="text-sm font-medium text-gray-600 mb-3">Rating</h3>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <FilterButton
                    key={rating}
                    active={filters.rating === rating}
                    onClick={() =>
                      onChangeFilters(
                        filters.rating === rating
                          ? { ...filters, rating: 0 }
                          : { ...filters, rating: rating }
                      )
                    }
                  >
                    {`${rating}.0+`}
                  </FilterButton>
                ))}
              </div>
            </section>

            <section className="px-3"> {/* Added padding for slider sections */}
              <h3 className="text-sm font-medium text-gray-600 mb-3">Cost</h3>
              <Box sx={{ width: '100%', paddingX: 1 }}>
                <CustomSlider
                  value={costValue}
                  onChange={handleCostChange}
                  min={500}
                  max={2500}
                  step={500}
                  marks
                  valueLabelDisplay="auto"
                  sx={{
                    color: '#4F46E5',
                    '& .MuiSlider-valueLabel': { 
                      color: 'black',
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                    }
                  }}
                />
                <div className="mt-2 text-sm text-gray-500">
                  Selected: ₹{costValue}
                </div>
              </Box>
            </section>

            <section className="px-3"> {/* Added padding for slider sections */}
              <h3 className="text-sm font-medium text-gray-600 mb-3">Number of People</h3>
              <Box sx={{ width: '100%', paddingX: 1 }}>
                <CustomSlider
                  value={peopleValue}
                  onChange={handlePeopleChange}
                  min={1}
                  max={5}
                  step={1}
                  marks
                  valueLabelDisplay="auto"
                  sx={{
                    color: '#4F46E5',
                    '& .MuiSlider-valueLabel': { 
                      color: 'black',
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                    }
                  }}
                />
                <div className="mt-2 text-sm text-gray-500">
                  Selected: {peopleValue} {peopleValue === 1 ? 'person' : 'people'}
                </div>
              </Box>
            </section>

            <section className="px-3"> {/* Added consistent padding */}
              <h3 className="text-sm font-medium text-gray-600 mb-3">Time</h3>
              <div className="space-y-2">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isDaySelected}
                      onChange={(e) => setIsDaySelected(e.target.checked)}
                      sx={{
                        color: '#4F46E5',
                        '&.Mui-checked': {
                          color: '#4F46E5',
                        },
                      }}
                    />
                  }
                  label="Day"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isNightSelected}
                      onChange={(e) => setIsNightSelected(e.target.checked)}
                      sx={{
                        color: '#4F46E5',
                        '&.Mui-checked': {
                          color: '#4F46E5',
                        },
                      }}
                    />
                  }
                  label="Night"
                />
              </div>
            </section>
          </div>

          <Button
            variant="contained"
            fullWidth
            onClick={applyFilters}
            sx={{
              mt: 3,
              backgroundColor: '#4F46E5',
              '&:hover': {
                backgroundColor: '#4338CA',
              },
            }}
          >
            Apply Filters
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-3 p-4">
        <div className="flex flex-wrap gap-2">
          <FilterButton
            onClick={() => setShowMenu(!showMenu)}
            startIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            }
          >
            Filters
          </FilterButton>

          <FilterButton
            onClick={() => setShowMenu(!showMenu)}
            active={filters.rating > 0}
          >
            {filters.rating > 0 ? `Rating: ${filters.rating}.0+` : "Rating"}
          </FilterButton>

          <FilterButton>Cost</FilterButton>
          <FilterButton>Time</FilterButton>
          <FilterButton>Great Offers</FilterButton>
        </div>
      </div>
    </>
  );
};

export default FilterButtons;