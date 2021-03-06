﻿using AutoMapper;
using System.Linq;
using Vega.Controllers.Resources;
using Vega.Core.Models;

namespace Vega.Mapping
{
    public class MappingProfile : Profile
    {

        public MappingProfile()
        {
            // domain to api resources
            CreateMap<Make, MakeResource>();
            CreateMap<Make, KeyValuePairResource>();
            CreateMap<Model, KeyValuePairResource>();
            CreateMap<Owner, KeyValuePairResource>();
            CreateMap<Feature, KeyValuePairResource>();
            CreateMap<Vehicle, SaveVehicleResource>()
                .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.Features.Select(vf => vf.FeatureId)));
            CreateMap<Vehicle, VehicleResource>()
                .ForMember(vr => vr.Make, opt => opt.MapFrom(v => v.Model.Make))
                .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.Features.Select(vf => new KeyValuePairResource{ Id = vf.Feature.Id, Name = vf.Feature.Name})));

            // API resource to domain
            CreateMap<SaveVehicleResource, Vehicle>()
                .ForMember(v => v.Id, opt => opt.Ignore())
                .ForMember(v => v.Features, opt => opt.Ignore())
                .AfterMap((vr, v) =>
                {
                    // removing unselected features sent via PUT method 
                    var removedFeatures = v.Features
                        .Where(f => !vr.Features.Contains(f.FeatureId))
                        .ToList();

                    foreach (var f in removedFeatures)
                        v.Features.Remove(f);

                    // adding new features sent via PUT method 
                    var addedFeatures = vr.Features
                        .Where(id => !v.Features.Any(f => f.FeatureId == id))
                        .Select(id => new VehicleFeature { FeatureId = id })
                        .ToList();

                    foreach (var f in addedFeatures)
                        v.Features.Add(f);
                });
            CreateMap<ContactResource, Contact>();

        }
    }
}
