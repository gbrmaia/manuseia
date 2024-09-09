'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, ArrowBigRightDash, TrendingUp, TrendingDown } from "lucide-react";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from '@/components/ui/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type AddReviewProps = {
    errorCode: string;
    reviews: Review[];
    onNewReview: (errorCode: string, newReview: Review) => void;
};

type Review = {
    clientCode: string;
    suggestion: string;
    date: string;
    review: 'positive' | 'negative';
};

export default function AddReview({ errorCode, reviews, onNewReview }: AddReviewProps) {
    const [clientCode, setClientCode] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [reviewType, setReviewType] = useState<'positive' | 'negative' | null>(null);

    const handleReview = async () => {
        if (clientCode.length !== 6) {
            setError('O código do cliente deve ter exatamente 6 caracteres.');
            return;
        }

        if (reviewType === null) {
            setError('Por favor, selecione um tipo de avaliação.');
            return;
        }

        setError(''); 

        const reviewData: Review = {
            clientCode,
            suggestion: '',
            date: new Date().toISOString(), 
            review: reviewType,
        };

        console.log('Enviando dados de revisão:', reviewData);

        try {
            const response = await fetch('http://localhost:4000/erro-crud/review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...reviewData, errorCode: errorCode.toString() }),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Erro ao enviar a avaliação: ${errorMessage}`);
            }

            setClientCode('');
            setReviewType(null);
            setPopoverOpen(false);
            onNewReview(errorCode, reviewData);
            toast({
                title: "Cadastrado ✅",
                description: "Salvo em nosso banco...",
            });
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
                toast({
                    title: "Oooopss... ❌",
                    description: "Falha ao avaliar.",
                });
            } else {
                setError('Erro desconhecido ao enviar a avaliação');
                toast({
                    title: "Oooopss... ❌",
                    description: "Falha ao avaliar.",
                });
            }
        }
    };

    const handleButtonClick = (type: 'positive' | 'negative') => {
        setReviewType(type);
        setPopoverOpen(true);
    };

    const positiveReviews = reviews.filter(review => review.review === 'positive').length;
    const negativeReviews = reviews.filter(review => review.review === 'negative').length;

    const totalReviews = positiveReviews + negativeReviews;
    const averageReviews = totalReviews > 0 ? (positiveReviews / totalReviews) * 100 : 0;

    const isPositive = averageReviews >= 60;
    const showAverage = totalReviews > 0;

    return (
        <div className='flex flex-col items-start gap-y-4'>
            <div className='flex items-center gap-x-4'>
                {showAverage && (
                    <div className="flex items-center gap-x-2">
                        <p className="text-sm font-semibold">
                            {averageReviews.toFixed(2)}%
                        </p>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    {isPositive ? (
                                        <TrendingUp
                                            className={`${isPositive ? 'text-green-500' : 'text-red-500'}`}
                                            size={20}
                                        />
                                    ) : (
                                        <TrendingDown
                                            className={`rounded ${isPositive ? 'text-green-500' : 'text-red-500'}`}
                                            size={20}
                                        />
                                    )}
                                </TooltipTrigger>
                                <TooltipContent className='mb-1' side="top">
                                    {isPositive ? 'Bem Avaliada.' : 'Mal Avalida.'}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                )}
                <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                    <PopoverTrigger asChild>
                        <div className='flex'>
                            <Button variant={"ghost"} className='hover:text-green-500 mr-2 p-1' size={"icon"} onClick={() => handleButtonClick('positive')}>
                                <ThumbsUp size={16} /> <span className="ml-1 text-sm">{positiveReviews}</span>
                            </Button>
                            <Button variant={"ghost"} className='hover:text-red-500 p-1' size={"icon"} onClick={() => handleButtonClick('negative')}>
                                <ThumbsDown size={16} /> <span className="ml-1 text-sm">{negativeReviews}</span>
                            </Button>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className="p-4">
                            <div className="flex flex-col mb-2">
                                <Label className="mb-1">Código de cliente</Label>
                                <div className="flex items-center">
                                    <Input
                                        type="text"
                                        value={clientCode}
                                        onChange={(e) => setClientCode(e.target.value)}
                                        placeholder="Insira"
                                        maxLength={6}
                                        className='w-24'
                                    />
                                    <Button className='ml-2' onClick={handleReview}>
                                        <ArrowBigRightDash /> Enviar
                                    </Button>
                                </div>
                            </div>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}
