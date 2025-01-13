import { Card, CardContent } from "./ui/card"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Quarter, useCommuting } from '../context/CommutingContext'

export function QuarterSelector() {
  const { state, dispatch } = useCommuting();

  const handleQuarterChange = (quarter: Quarter) => {
    dispatch({ type: 'SET_SELECTED_QUARTER', payload: quarter });
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid gap-2">
          <Label htmlFor="quarter">Select Quarter</Label>
          <Select
            value={state.selectedQuarter}
            onValueChange={handleQuarterChange}
          >
            <SelectTrigger id="quarter">
              <SelectValue placeholder="Select quarter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Q1">Q1</SelectItem>
              <SelectItem value="Q2">Q2</SelectItem>
              <SelectItem value="Q3">Q3</SelectItem>
              <SelectItem value="Q4">Q4</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
