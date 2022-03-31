﻿using E_Commerce_API.Application.Repositories;
using E_Commerce_API.Domain.Entites;
using E_Commerce_API.Persistence.Contexts;
using E_Commerce_API.Persistence.Repositories;


namespace E_Commerce_API.Persistence.Concretes
{
    public class CampaignReadRepository : ReadRepository<Campaign>, ICampaignReadRepository
    {
        public CampaignReadRepository(ECommerceAPIDBContext context) : base(context) { }
    }
}
