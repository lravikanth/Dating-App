using Microsoft.AspNetCore.Http;
using System;

namespace DatingApp.Helpers
{
    public static class Extensions
    {
        public static void AddApplicationError(this HttpResponse response, string message )
        {
            response.Headers.Add("Application-Error",message);
            response.Headers.Add("Access-Control-Expose-Headers","Application-Error");
            response.Headers.Add("Access-Control-allow-origin","*");
        }
        public static int CalculateAge(this DateTime response) {
            int age = DateTime.Now.Year - response.Year;
            if (response.AddYears(age) > DateTime.Now)
                age--;

                return age;

        }
    }
}