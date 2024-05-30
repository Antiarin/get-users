"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@components/ui/pagination";
import { UserInterface } from "@components/types/user.interface";

const MAX_PAGE = 19999;

export default function Home() {
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://give-me-users-forever.vercel.app/api/users/${page}/next`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data.users);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [page]);

  const handlePrev = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (page < MAX_PAGE) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center  p-5">
      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl !text-black relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert mb-5">
          USERS
        </h1>
      </div>
      {loading ? (
        <h1 className="text-lg sm:text-xl lg:text-2xl">Loading...</h1>
      ) : error ? (
        <h1 className="text-lg sm:text-xl lg:text-2xl">Error: {error}</h1>
      ) : (
        <div className="w-full overflow-x-auto">
          <Table className="w-full">
            <TableCaption className="mb-5 text-lg sm:text-xl lg:text-2xl">A list of your Users</TableCaption>
            <TableHeader>
              <TableRow className="text-left mt-2 border-b-2 !border-white border-opacity-30">
                <TableHead className="text-xs sm:text-sm lg:text-base">id</TableHead>
                <TableHead className="text-xs sm:text-sm lg:text-base">full name</TableHead>
                <TableHead className="text-xs sm:text-sm lg:text-base">email</TableHead>
                <TableHead className="text-xs sm:text-sm lg:text-base">phone number</TableHead>
                <TableHead className="text-xs sm:text-sm lg:text-base">job title</TableHead>
                <TableHead className="text-xs sm:text-sm lg:text-base">company</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow className="text-left mt-2" key={user.ID}>
                  <TableCell className="font-medium text-xs sm:text-sm lg:text-base">{user.ID}</TableCell>
                  <TableCell className="p-3 text-xs sm:text-sm lg:text-base">{user.FirstNameLastName}</TableCell>
                  <TableCell className="p-3 text-xs sm:text-sm lg:text-base">{user.Email}</TableCell>
                  <TableCell className="p-3 text-xs sm:text-sm lg:text-base">{user.Phone}</TableCell>
                  <TableCell className="p-3 text-xs sm:text-sm lg:text-base">{user.JobTitle}</TableCell>
                  <TableCell className="p-3 text-xs sm:text-sm lg:text-base">{user.Company}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      <Pagination className="mt-4">
        <PaginationContent className="flex gap-2 sm:gap-4 lg:gap-6">
          <PaginationItem>
            <PaginationPrevious onClick={handlePrev} />
          </PaginationItem>
          {page !== 0 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink isActive className="p-2 border-opacity-15 text-xs sm:text-sm lg:text-base">
              {page + 1}
            </PaginationLink>
          </PaginationItem>
          {page !== MAX_PAGE && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext onClick={handleNext} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
}
