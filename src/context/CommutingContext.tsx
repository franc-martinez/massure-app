import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface CommutingData {
  [quarter: string]: {
    publicTransport: number;
    cycling: number;
    passengerCar: number;
    gasolineCar: number;
    dieselCar: number;
    hybridCar: number;
    electricCar: number;
    airplaneEurope: number;
  };
}

export type Quarter = 'Q1' | 'Q2' | 'Q3' | 'Q4';

interface CommutingState {
  data: CommutingData;
  selectedQuarter: Quarter;
}

// Define the initial state
const initialState: CommutingState = {
  data: {
    Q1: {
      publicTransport: 2111,
      cycling: 2000,
      passengerCar: 1000,
      gasolineCar: 650,
      dieselCar: 52,
      hybridCar: 45,
      electricCar: 122,
      airplaneEurope: 2000
    },
    Q2: {
      publicTransport: 4000,
      cycling: 3500,
      passengerCar: 1500,
      gasolineCar: 500,
      dieselCar: 400,
      hybridCar: 200,
      electricCar: 535,
      airplaneEurope: 1500
    },
    Q3: {
      publicTransport: 3500,
      cycling: 2500,
      passengerCar: 1899,
      gasolineCar: 600,
      dieselCar: 500,
      hybridCar: 650,
      electricCar: 555,
      airplaneEurope: 1700
    },
    Q4: {
      publicTransport: 2500,
      cycling: 1000,
      passengerCar: 1556,
      gasolineCar: 670,
      dieselCar: 515,
      hybridCar: 789,
      electricCar: 650,
      airplaneEurope: 2100
    }
  },
  selectedQuarter: 'Q1'
};

type Action =
  | { type: 'UPDATE_DATA'; payload: { quarter: string; data: Partial<CommutingData[string]> } }
  | { type: 'RESET_DATA' }
  | { type: 'SET_SELECTED_QUARTER'; payload: Quarter };

function commutingReducer(state: CommutingState, action: Action): CommutingState {
  switch (action.type) {
    case 'UPDATE_DATA':
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.quarter]: {
            ...state.data[action.payload.quarter],
            ...action.payload.data,
          }
        }
      };
    case 'RESET_DATA':
      return initialState;
    case 'SET_SELECTED_QUARTER':
      return {
        ...state,
        selectedQuarter: action.payload
      };
    default:
      return state;
  }
}

const CommutingContext = createContext<{
  state: CommutingState;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

export function CommutingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(commutingReducer, initialState);

  return (
    <CommutingContext.Provider value={{ state, dispatch }}>
      {children}
    </CommutingContext.Provider>
  );
}

export function useCommuting() {
  const context = useContext(CommutingContext);
  if (context === undefined) {
    throw new Error('useCommuting must be used within a CommutingProvider');
  }
  return context;
}
