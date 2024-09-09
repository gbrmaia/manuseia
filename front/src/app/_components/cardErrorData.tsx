'use client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import ErrorSearch from "./searchErro";
import AddReview from "./reviewAdd";
import { LoaderCircle, SlidersHorizontal, Star, TrendingUp, TrendingDown, CircleSlash } from "lucide-react";

type Review = {
    clientCode: string;
    suggestion: string;
    date: string;
    review: 'positive' | 'negative';
};

type Errors = {
    id: string;
    title: string;
    type: string;
    errorCode: string;
    description: string;
    positiveReview: number;
    negativeReview: number;
    createdAt: string;
    reviews: Review[];
};

const fetchData = async (): Promise<Errors[]> => {
    const res = await fetch("http://localhost:4000/erro-crud/", { cache: "no-store", next: {revalidate:30} }, );

    if (!res.ok) {
        throw new Error("Falha ao listar códigos cadastrados.");
    }

    const data = await res.json();
    return data;
}

const CardErrorTable: React.FC = () => {
    const [filter, setFilter] = useState<string>('');
    const [dataErrors, setDataErrors] = useState<Errors[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        fetchData()
            .then(data => {
                setDataErrors(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const updateReviews = (errorCode: string, newReview: Review) => {
        setDataErrors(prevErrors =>
            prevErrors.map(error =>
                error.errorCode === errorCode
                    ? { ...error, reviews: [...error.reviews, newReview] }
                    : error
            )
        );
    };

    const calculateTotalReviews = (): number => {
        return dataErrors.reduce((total, error) => total + error.reviews.length, 0);
    };

    const calculateAverageReviewsPerSuggestion = (): number => {
        return dataErrors.length === 0 ? 0 : calculateTotalReviews() / dataErrors.length;
    };

    const calculatePositiveReviewPercentage = (error: Errors): number => {
        const totalReviews = error.positiveReview + error.negativeReview;
        return totalReviews === 0 ? 0 : (error.positiveReview / totalReviews) * 100;
    };

    const filteredErrors = dataErrors.filter(error => {
        const titleMatch = error.title.toLowerCase().includes(searchTerm.toLowerCase());
        const typeMatch = error.type.toLowerCase().includes(searchTerm.toLowerCase());
        const errorCodeMatch = String(error.errorCode).toLowerCase().includes(searchTerm.toLowerCase());
        const descriptionMatch = error.description.toLowerCase().includes(searchTerm.toLowerCase());

        return titleMatch || typeMatch || errorCodeMatch || descriptionMatch;
    });

    const sortedErrors = filteredErrors.sort((a, b) => {
        const aPercentage = calculatePositiveReviewPercentage(a);
        const bPercentage = calculatePositiveReviewPercentage(b);

        if (filter === 'positive') {
            return bPercentage - aPercentage;
        } else if (filter === 'negative') {
            return aPercentage - bPercentage;
        } else if (filter === 'no-review') {
            return a.reviews.length - b.reviews.length;
        }
        return 0;
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoaderCircle className="animate-spin" />
            </div>
        );
    }

    if (error) {
        return <div>⚠ Erro ao carregar: {error}</div>;
    }

    return (
        <div>
            <div className="mb-4 flex items-center">
                <div className="flex-grow">
                    <ErrorSearch onSearch={setSearchTerm} />
                </div>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="ml-1" asChild>
                            <Button size={"icon"} variant="outline">
                                <SlidersHorizontal className="size-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent >
                            <DropdownMenuLabel>Filtrar por:</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem
                                checked={filter === 'positive'}
                                onCheckedChange={() => setFilter(filter === 'positive' ? '' : 'positive')}
                            >
                                <TrendingUp className="size-4 mr-1" />Bem avaliadas
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={filter === 'negative'}
                                onCheckedChange={() => setFilter(filter === 'negative' ? '' : 'negative')}
                            >
                                <TrendingDown className="size-4 mr-1" />Mal avaliadas
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={filter === 'no-review'}
                                onCheckedChange={() => setFilter(filter === 'no-review' ? '' : 'no-review')}
                            >
                                <CircleSlash className="size-4 mr-1" /> Sem avaliação
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Star className="hover:text-yellow-500 brightness-125 ml-2 hover:bg-secondary rounded" />
                            </TooltipTrigger>
                            <TooltipContent side="top">
                                <p>Média total de avaliações: {calculateAverageReviewsPerSuggestion().toFixed(1)}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
            <div className="gap-4 mt-4">
                {sortedErrors.map((error) => (
                    <Card  key={error.errorCode}>
                        <CardHeader className="relative">
                            <CardTitle className="select-none flex items-center justify-between">
                                <span>{error.type} - {error.errorCode}</span>
                                <AddReview errorCode={error.errorCode} reviews={error.reviews} onNewReview={updateReviews} />
                            </CardTitle>
                            <div className="flex items-center">
                                <CardDescription className="select-none text-xs">
                                    {error.title}
                                </CardDescription>
                                <CardDescription className="ml-2 select-none text-xs">
                                    {new Date(error.createdAt).toLocaleString()}
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible>
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>Descrição</AccordionTrigger>
                                    <AccordionContent>
                                        <p className="break-words">{error.description}</p>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                        <CardFooter>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default CardErrorTable;
