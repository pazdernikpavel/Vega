using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Vega.Controllers.Resources;
using Vega.Models;

namespace Vega.Controllers
{
    [Route("/api/vehicles")]
    public class VehicleController : Controller
    {
        private readonly IMapper mapper;

        public VehicleController(IMapper mapper)
        {
            this.mapper = mapper;
        }

        [HttpPost]
        public IActionResult CreateVehicle([FromBody] VehicleResource vehicleResource)
        {
            var vehicle = mapper.Map<VehicleResource, Vehicle>(vehicleResource);
            return Ok(vehicle);
        }
    }
}