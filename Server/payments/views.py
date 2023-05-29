from django.shortcuts import render
from rest_framework.decorators import api_view
from utils.get_user_id import get_user_by_sessionid
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404, get_list_or_404
from payments.models import Payment
from payments.serializers import PaymentsSerializer
from Orders.models import Order
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes


# Create your views here.
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def edit_payment(request, pk):
    user_obj = request.user

    payment = get_object_or_404(Payment, pk=pk)

    if payment.order.user != user_obj:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    # check if paid already give a feed back
    if payment.is_paid:
        return Response(
            {"error": "This order is already paid for!", "id": payment.id},
            status=status.HTTP_400_BAD_REQUEST,
        )
    payment.is_paid = request.data.get("is_paid", False)
    payment.save()
    return Response(status=status.HTTP_200_OK)
