﻿using System;
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
    public class StoresController : ApiController
    {
        public HttpResponseMessage Get()
        {
            DataTable table = new DataTable();

            string query = @" select * from dbo.Stores ";

            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["FinalOnboardingTask"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        public string Post(Stores stors)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @" insert into dbo.Stores values (
                '" + stors.StoreName + @"'
                ,'" + stors.StoreAddress + "') ";

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

        public string Put(Stores stors)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @" 
                update dbo.Stores set 
                StoreName = '" + stors.StoreName + @"'
                , StoreAddress = '" + stors.StoreAddress + @"' 
                where StoreId = " + stors.StoreId + @"                 
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

        public string Delete(Stores stors)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @" 
                 delete from dbo.Stores 
                where StoreId = " + stors.StoreId + @"                 
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

    
