"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BmiCalculator() {
  const [units, setUnits] = useState("metric")
  const [height, setHeight] = useState({ cm: "", ft: "", in: "" })
  const [weight, setWeight] = useState({ kg: "", lbs: "" })
  const [bmi, setBmi] = useState(null)
  const [bmiCategory, setBmiCategory] = useState("")
  const [error, setError] = useState("")

  const calculateBMI = () => {
    setError("")

    let calculatedBmi = 0

    if (units === "metric") {
      if (!height.cm || !weight.kg) {
        setError("Please enter both height and weight")
        return
      }

      const heightInMeters = Number.parseFloat(height.cm) / 100
      calculatedBmi = Number.parseFloat(weight.kg) / (heightInMeters * heightInMeters)
    } else {
      if (!height.ft || !weight.lbs) {
        setError("Please enter both height and weight")
        return
      }

      const heightInInches = Number.parseFloat(height.ft) * 12 + (Number.parseFloat(height.in) || 0)
      calculatedBmi = (Number.parseFloat(weight.lbs) * 703) / (heightInInches * heightInInches)
    }

    if (isNaN(calculatedBmi) || !isFinite(calculatedBmi)) {
      setError("Please enter valid numbers")
      return
    }

    setBmi(calculatedBmi.toFixed(1))

    // Determine BMI category
    if (calculatedBmi < 18.5) {
      setBmiCategory("Underweight")
    } else if (calculatedBmi < 25) {
      setBmiCategory("Normal weight")
    } else if (calculatedBmi < 30) {
      setBmiCategory("Overweight")
    } else {
      setBmiCategory("Obesity")
    }
  }

  const resetCalculator = () => {
    setHeight({ cm: "", ft: "", in: "" })
    setWeight({ kg: "", lbs: "" })
    setBmi(null)
    setBmiCategory("")
    setError("")
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">BMI Calculator</h3>
        <p className="text-muted-foreground">
          Calculate your Body Mass Index (BMI) to get an indication of whether you have a healthy weight for your
          height.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Calculate Your BMI</CardTitle>
            <CardDescription>Enter your height and weight to calculate your Body Mass Index.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Units</Label>
              <Tabs value={units} onValueChange={setUnits} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="metric">Metric (cm/kg)</TabsTrigger>
                  <TabsTrigger value="imperial">Imperial (ft/lbs)</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="space-y-2">
              <Label>Height</Label>
              {units === "metric" ? (
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    placeholder="Height"
                    value={height.cm}
                    onChange={(e) => setHeight({ ...height, cm: e.target.value })}
                    min="0"
                  />
                  <span className="text-muted-foreground">cm</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    placeholder="Feet"
                    value={height.ft}
                    onChange={(e) => setHeight({ ...height, ft: e.target.value })}
                    min="0"
                    className="w-20"
                  />
                  <span className="text-muted-foreground">ft</span>
                  <Input
                    type="number"
                    placeholder="Inches"
                    value={height.in}
                    onChange={(e) => setHeight({ ...height, in: e.target.value })}
                    min="0"
                    max="11"
                    className="w-20"
                  />
                  <span className="text-muted-foreground">in</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Weight</Label>
              {units === "metric" ? (
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    placeholder="Weight"
                    value={weight.kg}
                    onChange={(e) => setWeight({ ...weight, kg: e.target.value })}
                    min="0"
                  />
                  <span className="text-muted-foreground">kg</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    placeholder="Weight"
                    value={weight.lbs}
                    onChange={(e) => setWeight({ ...weight, lbs: e.target.value })}
                    min="0"
                  />
                  <span className="text-muted-foreground">lbs</span>
                </div>
              )}
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={resetCalculator}>
              Reset
            </Button>
            <Button onClick={calculateBMI}>Calculate BMI</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Results</CardTitle>
            <CardDescription>Your BMI result and what it means for your health.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {bmi ? (
              <div className="space-y-6">
                <div className="text-center p-6 bg-muted rounded-lg">
                  <div className="text-4xl font-bold mb-2">{bmi}</div>
                  <div
                    className={`text-lg font-medium ${
                      bmiCategory === "Normal weight"
                        ? "text-green-500"
                        : bmiCategory === "Underweight"
                          ? "text-amber-500"
                          : "text-red-500"
                    }`}
                  >
                    {bmiCategory}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">What does this mean?</h4>
                  <p className="text-muted-foreground text-sm mb-4">
                    {bmiCategory === "Underweight" &&
                      "Being underweight could indicate nutritional deficiencies or other health issues. Consider consulting with a healthcare professional."}
                    {bmiCategory === "Normal weight" &&
                      "Your BMI indicates you're at a healthy weight for your height. Maintain your health with regular exercise and a balanced diet."}
                    {bmiCategory === "Overweight" &&
                      "Being overweight may increase your risk of health problems. Consider making lifestyle changes like improved diet and increased physical activity."}
                    {bmiCategory === "Obesity" &&
                      "Obesity is associated with increased risk of serious health conditions like heart disease, diabetes, and stroke. It's recommended to consult with healthcare professionals for a personalized plan."}
                  </p>

                  <h4 className="font-medium mb-2">BMI Categories:</h4>
                  <ul className="space-y-1 text-sm">
                    <li className="flex justify-between">
                      <span>Underweight</span>
                      <span className="text-muted-foreground">Less than 18.5</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Normal weight</span>
                      <span className="text-muted-foreground">18.5 - 24.9</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Overweight</span>
                      <span className="text-muted-foreground">25 - 29.9</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Obesity</span>
                      <span className="text-muted-foreground">30 or greater</span>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[300px] text-center">
                <p className="text-muted-foreground mb-4">
                  Enter your height and weight and click "Calculate BMI" to see your results.
                </p>
                <div className="text-sm text-muted-foreground">
                  BMI is a screening tool, not a diagnostic of body fatness or health.
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About BMI</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Body Mass Index (BMI) is a simple calculation using a person's height and weight. The formula is BMI =
              kg/m² where kg is a person's weight in kilograms and m² is their height in meters squared.
            </p>
            <p className="text-muted-foreground">
              While BMI can be a useful tool for identifying potential weight issues, it has limitations:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>It doesn't distinguish between fat, muscle, and bone mass</li>
              <li>It doesn't account for age, gender, ethnicity, or muscle mass</li>
              <li>Athletes may have a high BMI due to increased muscle mass</li>
              <li>It may not be accurate for elderly individuals who have lost muscle mass</li>
            </ul>
            <p className="text-muted-foreground">
              Always consult with healthcare professionals for a comprehensive health assessment.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

