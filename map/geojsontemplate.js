<!– MapServer Template –>
[resultset layer=Survey_Plans]
{
  "type": "FeatureCollection",
  "features": [
    [feature trimlast=","]
    {
      "type": "Feature",
      "id": "[spid]",
      "geometry": {
        "type": "Polygon",
        "coordinates":[[[shpxy precision="6" cs=", " xh="[" yf="]"]]]
      },
      "properties": {
        "Survey Name": "[surveyName]"
      }
    },
    [/feature]
  ]
}
[/resultset]
