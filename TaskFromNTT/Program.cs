using Azure.Core;
using Azure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.EntityFrameworkCore;
using System;
using System.Text.RegularExpressions;
using TaskFromNTT;
using TaskFromNTT.Models;
using Range = TaskFromNTT.Models.Range;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();
string? connection = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDBContext>(options => options.UseSqlServer(connection));
var app = builder.Build();
// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();
app.UseEndpoints(endpoints =>
{
    endpoints.MapRazorPages();
});

app.MapGet("/api/requests/getalldata", async (HttpContext context, AppDBContext service) => {
    var response = context.Response;
    var request = context.Request;
    if (request.Headers["Table"] == "category")
    {
        response.StatusCode = 200;
        await response.WriteAsJsonAsync(service.Categories.ToList());
    }
    else if (request.Headers["Table"] == "product")
    {
        response.StatusCode = 200;
        await response.WriteAsJsonAsync(service.Products.ToList());
    }

});

app.MapPost("/api/requests/getselectdata", async (HttpContext context, AppDBContext service) => {
    var response = context.Response;
    var request = context.Request;
    var body = await request.ReadFromJsonAsync<Range>();

    if (request.Headers["Table"] == "category")
    {
        var responseList = service.Categories.Where(p => p.Id >= body.Start).OrderBy(p => p.Id).Take(body.End).ToList();
        response.StatusCode = 200;
        await response.WriteAsJsonAsync(responseList);
    }
    else if (request.Headers["Table"] == "product")
    {
        var responseList = service.Products.Where(p => p.Id >= body.Start).OrderBy(p => p.Id).Take(body.End).ToList();
        response.StatusCode = 200;
        await response.WriteAsJsonAsync(responseList);
    }
});

app.MapPost("/api/requests/add", async (HttpContext context, AppDBContext service) => {
    var response = context.Response;
    var request = context.Request;
    if (request.Headers["Table"] == "category")
    {
        var body = await request.ReadFromJsonAsync<Ñategory>();
        service.Add(body);
        service.SaveChanges();
        response.StatusCode = 200;
        await response.WriteAsJsonAsync(service.Categories.ToList()); 
    }
    else if (request.Headers["Table"] == "product")
    {
        var body = await request.ReadFromJsonAsync<Product>();
        service.Add(body);
        service.SaveChanges();
        response.StatusCode = 200;
        await response.WriteAsJsonAsync(service.Products.ToList()); 
    }
});

app.MapPost("/api/requests/update", async (HttpContext context, AppDBContext service) => {
    var response = context.Response;
    var request = context.Request;
    var body = await request.ReadFromJsonAsync<Product>();
    var product = service.Products.Where(p => p.Id == body.Id).FirstOrDefault();
    product = body;
    service.SaveChanges();
    response.StatusCode = 200;
    await response.WriteAsJsonAsync(service.Products.ToList());
});

app.MapPost("/api/requests/delete", async (HttpContext context, AppDBContext service) => {
    var response = context.Response;
    var request = context.Request;
    if (request.Headers["Table"] == "category")
    {
        var body = await request.ReadFromJsonAsync<Ñategory>();
        service.Categories.Remove(service.Categories.Where(p => p.Id == body.Id).FirstOrDefault());
        service.SaveChanges();
        response.StatusCode = 200;
        await response.WriteAsJsonAsync(service.Categories.ToList());
    }
    else if (request.Headers["Table"] == "product")
    {
        var body = await request.ReadFromJsonAsync<Product>();
        service.Products.Remove(service.Products.Where(p => p.Id == body.Id).FirstOrDefault());
        service.SaveChanges();
        response.StatusCode = 200;
        await response.WriteAsJsonAsync(service.Products.ToList());
    }
});

app.MapGet("/api/requests/join", async (HttpContext context, AppDBContext service) => {
    var response = context.Response;
    var request = context.Request;
    var joinedTable = service.Products.Join(service.Categories,
       p => p.Category,
       c => c.NumberCategory,
       (p, c) => new Joined
       {
           Id = p.Id,
           Name = p.Name,
           Category = c.Name,
           Price = p.Price,
           Quantity = p.Quantity
       });
       response.StatusCode = 200;
       await response.WriteAsJsonAsync(joinedTable.ToList());
});

app.Run();
