using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Vega.Models;

namespace Vega.Controllers
{
    [Route("/api/vehicles")]
    public class VehicleController : Controller
    {
        [HttpPost]
        public IActionResult CreateVehicle([FromBody] Vehicle vehicle)
        {
            return Ok(vehicle);
        }
    }
}