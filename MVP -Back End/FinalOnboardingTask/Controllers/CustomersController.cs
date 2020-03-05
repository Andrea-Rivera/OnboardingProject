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
    public class CustomersController : ApiController
    {
        public HttpResponseMessage Get()
        {

            DataTable table = new DataTable();

            string query = @" select * from dbo.Customers ";

            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["FinalOnboardingTask"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        public string Post(Customers cust)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @" insert into dbo.Customers values (
                '" + cust.CustomerName + @"'
                ,'" + cust.CustomerAddress + "') ";

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

        public string Put(Customers cust)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @" 
                update dbo.Customers set 
                CustomerName = '" + cust.CustomerName + @"'
                , CustomerAddress = '" + cust.CustomerAddress + @"' 
                where CustomerId = " + cust.CustomerId + @"                 
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

        public string Delete(Customers cust)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @" 
                 delete from dbo.Customers 
                where CustomerId = " + cust.CustomerId + @"                 
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
