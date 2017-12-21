using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using Vega.Controllers.Resources;
using Vega.Models;

namespace Vega.Mapping
{
    public class MappingProfile : Profile
    {

        public MappingProfile()
        {
            // domain to api resources
            CreateMap<Make, MakeResource>();
            CreateMap<Model, ModelResource>();
            CreateMap<Feature, FeatureResource>();
            CreateMap<Vehicle, VehicleResource>()
                .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.Features.Select(vf => vf.FeatureId)));

            // API resource to domain
            CreateMap<VehicleResource, Vehicle>()
                .ForMember(v => v.Id, opt => opt.Ignore())
                .ForMember(v => v.Features, opt => opt.Ignore())
                .AfterMap((vr, v) =>
                {
                    // removing unselected features sent via PUT method 
                    var removedFeatures = v.Features
                        .Where(f => !vr.Features.Contains(f.FeatureId));

                    foreach (var f in removedFeatures)
                        v.Features.Remove(f);

                    // adding new features sent via PUT method 
                    var addedFeatures = vr.Features
                        .Where(id => !v.Features.Any(f => f.FeatureId == id))
                        .Select(id => new VehicleFeature { FeatureId = id });

                    foreach (var f in addedFeatures)
                        v.Features.Add(f);
                });
            CreateMap<ContactResource, Contact>();

        }
    }
}
