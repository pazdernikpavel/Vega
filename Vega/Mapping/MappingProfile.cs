using AutoMapper;
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

            // API resource to domain
            CreateMap<VehicleResource, Vehicle>()
                .ForMember(v => v.Features, opt => opt.MapFrom(vr => vr.Features.Select(id => new VehicleFeature { FeatureId = id})));
            CreateMap<ContactResource, Contact>();

        }
    }
}
