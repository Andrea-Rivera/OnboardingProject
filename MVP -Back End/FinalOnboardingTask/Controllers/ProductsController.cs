using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FinalOnboardingTask.Models;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

namespace FinalOnboardingTask.Controllers
{
    public class ProductsController : ApiController
    {
        public HttpResponseMessage Get()
        {
            DataTable table = new DataTable();

            string query = @" select * from dbo.Products ";

            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["FinalOnboardingTask"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        public string Post(Products prods)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @" insert into dbo.Products values (
                '" + prods.ProductName + @"'
                ,'" + prods.ProductPrice + "') ";

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["FinalOnboardingTask"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }


                return "Added Sucessfully";
            }
            catch (Exception)
            {
                return "Failed to Add";
            }
        }

        public string Put(Products prods)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @" 
                update dbo.Products set 
                ProductName = '" + prods.ProductName + @"'
                , ProductPrice = '" + prods.ProductPrice + @"' 
                where ProductId = " + prods.ProductId + @"                 
                ";
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["FinalOnboardingTask"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }


                return "Updated Sucessfully";
            }
            catch (Exception)
            {
                return "Failed to Add";
            }
        }

        public string Delete(Products prods)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @" 
                 delete from dbo.Products 
                where ProductId = " + prods.ProductId + @"                 
                ";


                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["FinalOnboardingTask"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }


                return "Deleted Sucessfully";
            }
            catch (Exception)
            {
                return "Failed to Delete";
            }
        }

    }
}
