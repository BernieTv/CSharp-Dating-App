using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers;

public class AutoMapperProfiles : Profile
{
    protected AutoMapperProfiles()
    {
        CreateMap<AppUser, MemberDto>();

        CreateMap<Photo, PhotoDto>();
    }
}