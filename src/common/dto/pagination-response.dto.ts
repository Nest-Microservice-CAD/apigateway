export class PaginationResponseDto {
  data: any;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}
