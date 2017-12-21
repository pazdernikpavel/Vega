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
                    var removedFeatures = new List<VehicleFeature>();
                    foreach (var f in v.Features)
                        if (vr.Features.Contains(f.FeatureId))
                            removedFeatures.Add(f);

                    foreach (var f in removedFeatures)
                        v.Features.Remove(f);

                    // adding new features sent via PUT method 
                    foreach (var id in vr.Features)
                        if (!v.Features.Any(f => f.FeatureId == id))
                            v.Features.Add(new VehicleFeature { FeatureId = id });


                });
            CreateMap<ContactResource, Contact>();

        }
    }
}
