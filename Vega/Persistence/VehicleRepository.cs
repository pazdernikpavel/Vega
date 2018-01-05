using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Vega.Core.Models;
using Vega.Core;

namespace Vega.Persistence
{

    public class VehicleRepository : IVehicleRepository
    {
        private readonly VegaDbContext _context;

        public VehicleRepository(VegaDbContext context)
        {
            _context = context;
        }

        public async Task<Vehicle> GetVehicle(int id, bool includeRelated = true)
        {
            if (!includeRelated)
                return await _context.Vehicles.SingleOrDefaultAsync(v => v.Id == id);

                return await _context.Vehicles
                    .Include(v => v.Features)
                    .ThenInclude(vf => vf.Feature)
                    .Include(v => v.Model)
                    .ThenInclude(v => v.Make)
                    .SingleOrDefaultAsync(v => v.Id == id);

        }

        public void Add(Vehicle vehicle)
        {
            _context.Vehicles.Add(vehicle);
        }

        public void Remove(Vehicle vehicle)
        {
            _context.Vehicles.Remove(vehicle);
        }

    }
}
