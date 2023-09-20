﻿using System;
using Unity.GrantManager.Applications;
using Unity.GrantManager.EntityFrameworkCore;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace Unity.GrantManager.Repositories
{
    [Dependency(ReplaceServices = true)]
    [ExposeServices(typeof(IApplicationUserAssignmentRepository))]
    public class ApplicationUserAssignmentRepository : EfCoreRepository<GrantManagerDbContext, ApplicationUserAssignment, Guid>, IApplicationUserAssignmentRepository
    {
        public ApplicationUserAssignmentRepository(IDbContextProvider<GrantManagerDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }
}
