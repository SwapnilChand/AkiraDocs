import { useState, useEffect, useCallback } from 'react'
import { Header } from './header'
import { Specification } from './specification'
import { Documentation } from './documentation'
import { Sidebar } from './sidebar'

// Comment out sampleSpec
// const sampleSpec = {
//   "openapi": "3.0.3",
//   "info": {
//     "title": "Enhanced Planets API",
//     "version": "1.1.0",
//     "description": "An API for retrieving and managing information about planets"
//   },
//   "servers": [
//     {
//       "url": "http://api.example.com/v1"
//     }
//   ],
//   "paths": {
//     "/planets": {
//       "get": {
//         "summary": "List planets",
//         "description": "Retrieve a list of planets, with optional filtering",
//         "parameters": [
//           {
//             "name": "type",
//             "in": "query",
//             "description": "Filter planets by type",
//             "required": false,
//             "schema": {
//               "type": "string",
//               "enum": ["terrestrial", "gas giant", "ice giant", "dwarf"]
//             }
//           },
//           {
//             "name": "limit",
//             "in": "query",
//             "description": "Maximum number of planets to return",
//             "required": false,
//             "schema": {
//               "type": "integer",
//               "default": 10
//             }
//           }
//         ],
//         "responses": {
//           "200": {
//             "description": "Successful response",
//             "content": {
//               "application/json": {
//                 "schema": {
//                   "type": "array",
//                   "items": {
//                     "$ref": "#/components/schemas/Planet"
//                   }
//                 }
//               }
//             }
//           }
//         },
//         "analysis_data": {
//           "performance_insights": "Average response time: 150ms. Consider implementing pagination for large result sets.",
//           "optimization_suggestions": "Add caching for frequently requested planet lists to reduce database load.",
//           "general_recommendations": [
//             "Implement proper database indexing on the 'type' field for faster filtering",
//             "Use a caching mechanism (e.g., Redis) for frequently accessed planet lists",
//             "Consider implementing GraphQL for more flexible querying options"
//           ]
//         }
//       },
//       "post": {
//         "summary": "Create a new planet",
//         "description": "Add a new planet to the database",
//         "security": [
//           {
//             "ApiKeyAuth": []
//           }
//         ],
//         "requestBody": {
//           "required": true,
//           "content": {
//             "application/json": {
//               "schema": {
//                 "$ref": "#/components/schemas/NewPlanet"
//               }
//             }
//           }
//         },
//         "responses": {
//           "201": {
//             "description": "Planet created successfully",
//             "content": {
//               "application/json": {
//                 "schema": {
//                   "$ref": "#/components/schemas/Planet"
//                 }
//               }
//             }
//           },
//           "401": {
//             "description": "Unauthorized"
//           }
//         },
//         "analysis_data": {
//           "performance_insights": "Average creation time: 200ms. Bulk creation might be beneficial for multiple planets.",
//           "optimization_suggestions": "Implement batch processing for creating multiple planets simultaneously.",
//           "general_recommendations": [
//             "Use database transactions to ensure data integrity during planet creation",
//             "Implement input validation and sanitization to prevent invalid data entry",
//             "Consider using a message queue for asynchronous processing of planet creation tasks"
//           ]
//         }
//       }
//     },
//     "/planets/{id}": {
//       "get": {
//         "summary": "Get a specific planet",
//         "description": "Retrieve details of a specific planet by its ID",
//         "parameters": [
//           {
//             "name": "id",
//             "in": "path",
//             "required": true,
//             "schema": {
//               "type": "integer"
//             }
//           },
//           {
//             "name": "include-moons",
//             "in": "query",
//             "description": "Include detailed moon information",
//             "required": false,
//             "schema": {
//               "type": "boolean",
//               "default": false
//             }
//           }
//         ],
//         "responses": {
//           "200": {
//             "description": "Successful response",
//             "content": {
//               "application/json": {
//                 "schema": {
//                   "$ref": "#/components/schemas/Planet"
//                 }
//               }
//             }
//           },
//           "404": {
//             "description": "Planet not found"
//           }
//         },
//         "analysis_data": {
//           "performance_insights": "Average response time: 80ms. Performance is good, but could be improved for planets with many moons.",
//           "optimization_suggestions": "Implement lazy loading for detailed moon information when 'include-moons' is true.",
//           "general_recommendations": [
//             "Use caching for frequently accessed planet details",
//             "Optimize database queries for retrieving moon information",
//             "Consider implementing a separate endpoint for detailed moon information to reduce payload size"
//           ]
//         }
//       },
//       "patch": {
//         "summary": "Update a planet",
//         "description": "Modify details of an existing planet",
//         "security": [
//           {
//             "ApiKeyAuth": []
//           }
//         ],
//         "parameters": [
//           {
//             "name": "id",
//             "in": "path",
//             "required": true,
//             "schema": {
//               "type": "integer"
//             }
//           }
//         ],
//         "requestBody": {
//           "required": true,
//           "content": {
//             "application/json": {
//               "schema": {
//                 "$ref": "#/components/schemas/PlanetUpdate"
//               }
//             }
//           }
//         },
//         "responses": {
//           "200": {
//             "description": "Planet updated successfully",
//             "content": {
//               "application/json": {
//                 "schema": {
//                   "$ref": "#/components/schemas/Planet"
//                 }
//               }
//             }
//           },
//           "401": {
//             "description": "Unauthorized"
//           },
//           "404": {
//             "description": "Planet not found"
//           }
//         },
//         "analysis_data": {
//           "performance_insights": "Average update time: 120ms. Consider optimizing for partial updates.",
//           "optimization_suggestions": "Implement partial updates to avoid unnecessary field updates and improve performance.",
//           "general_recommendations": [
//             "Use database transactions to ensure data consistency during updates",
//             "Implement proper error handling and rollback mechanisms for failed updates",
//             "Consider using optimistic locking to handle concurrent updates"
//           ]
//         }
//       }
//     }
//   },
//   "components": {
//     "schemas": {
//       "Planet": {
//         "type": "object",
//         "properties": {
//           "id": {
//             "type": "integer"
//           },
//           "name": {
//             "type": "string"
//           },
//           "type": {
//             "type": "string",
//             "enum": ["terrestrial", "gas giant", "ice giant", "dwarf"]
//           },
//           "moons": {
//             "type": "integer"
//           },
//           "hasRings": {
//             "type": "boolean"
//           }
//         },
//         "required": ["id", "name", "type"]
//       },
//       "NewPlanet": {
//         "type": "object",
//         "properties": {
//           "name": {
//             "type": "string"
//           },
//           "type": {
//             "type": "string",
//             "enum": ["terrestrial", "gas giant", "ice giant", "dwarf"]
//           },
//           "moons": {
//             "type": "integer"
//           },
//           "hasRings": {
//             "type": "boolean"
//           }
//         },
//         "required": ["name", "type"]
//       },
//       "PlanetUpdate": {
//         "type": "object",
//         "properties": {
//           "name": {
//             "type": "string"
//           },
//           "moons": {
//             "type": "integer"
//           },
//           "hasRings": {
//             "type": "boolean"
//           }
//         }
//       }
//     },
//     "securitySchemes": {
//       "ApiKeyAuth": {
//         "type": "apiKey",
//         "in": "header",
//         "name": "X-API-Key"
//       }
//     }
//   }
// }

function DocsGeneration() {
  const [spec, setSpec] = useState('')
  const [parsedSpec, setParsedSpec] = useState(null)
  const [activeEndpoint, setActiveEndpoint] = useState(null)
  const [isProd, setIsProd] = useState(false)

  const handleSpecificationChange = (newSpec) => {
    setSpec(newSpec)
    try {
      const parsed = JSON.parse(newSpec)
      setParsedSpec(parsed)
    } catch (error) {
      console.error('Failed to parse specification:', error)
      setParsedSpec(null)
    }
  }

  const handleEndpointClick = (endpointId) => {
    setActiveEndpoint(endpointId)
    // You might want to scroll to the selected endpoint in the Documentation component
  }

  const handleSpecUpdate = useCallback((updatedSpec) => {
    setParsedSpec(updatedSpec);
    // You might want to update the original spec string here as well
    // setSpec(JSON.stringify(updatedSpec, null, 2));
  }, []);

  useEffect(() => {
    // Remove initialization with sample data
  }, [])

  return (
    <div className="w-full h-screen flex flex-col">
      <Header isProd={isProd} setIsProd={setIsProd} />
      <main className="flex-1 flex overflow-hidden">
        <Sidebar apiSpec={parsedSpec} onEndpointClick={handleEndpointClick} />
        <div className="flex-1 overflow-y-auto p-8">
          <div className="mb-6">
            <Specification 
              specification={spec} 
              setSpecification={handleSpecificationChange} 
            />
          </div>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-full">
              {parsedSpec ? (
                <Documentation 
                  apiSpec={parsedSpec} 
                  activeEndpoint={activeEndpoint} 
                  isProd={isProd}
                  onSpecUpdate={handleSpecUpdate}
                />
              ) : (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-600">Enter a GitHub URL to generate API documentation.</p>
                  <p className="text-sm text-gray-400 mt-2">Once you submit a valid URL, your API documentation will appear here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default DocsGeneration