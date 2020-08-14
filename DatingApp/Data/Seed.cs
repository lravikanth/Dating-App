using System;
using System.Collections.Generic;
using System.Linq;
using DatingApp.Models;
using Newtonsoft.Json;

namespace DatingApp.Data
{
    public class Seed
    {
        public static void SeedUsers(DataContext data) {
            if(!data.Users.Any()) {
                var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);
                foreach (var user in users){
                            byte[] passwordHash, passwordSalt;
                            CreatePasswordHash("password",out passwordHash,out passwordSalt);
                            user.PasswordHash =  passwordHash;
                            user.Passwordsalt =  passwordSalt;
                            user.UserName = user.UserName.ToLower();
                            data.Users.Add(user);
                            data.SaveChanges();
                }
            }
          
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

    }
}