import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"

const BreadCrumbNav = () => {
    const [paths, setPaths] = useState([]);
    const location = useLocation();
  
    useEffect(() => {
      if (location) {
        const splitPaths = location.pathname.split('/').filter(Boolean); // Split and remove empty strings
        setPaths(splitPaths);
      }
    }, [location]);
  
    return (
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          {paths.map((path, index) => {
            const to = `/${paths.slice(0, index + 1).join('/')}`;
            const isLast = index === paths.length - 1;
            return (
              <div key={to} className="flex items-center space-x-2">
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{path}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={to}>{path}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </div >
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    );
  };
  
  export default BreadCrumbNav;