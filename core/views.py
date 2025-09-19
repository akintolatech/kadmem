from io import BytesIO

from django.core.files import File
from django.urls import reverse
import segno
from django.shortcuts import render, get_object_or_404, redirect
from .forms import MemorialForm
from .models import Memorial


def index(request):
    context = {
        "message": "wired",
        "memorials": Memorial.objects.all()
    }
    return render(request, 'core/index.html', context)


def create_memorial(request):
    if request.method == "POST":
        form = MemorialForm(request.POST, request.FILES)
        if form.is_valid():
            memorial = form.save(commit=False)
            memorial.save()  # save first to get ID

            # Build the URL for the memorial detail page
            base_url = request.build_absolute_uri('/')[:-1]
            memorial_url = base_url + reverse('memorial:view_memorial', args=[memorial.id])

            # Create QR code in memory
            qr = segno.make(memorial_url)
            buffer = BytesIO()
            qr.save(buffer, kind='png', scale=5)
            buffer.seek(0)

            # Save to ImageField
            memorial.qr_code_data.save(f"{memorial.id}_qr.png", File(buffer), save=True)

            return redirect("memorial:list_memorial")
    else:
        form = MemorialForm()

    return render(request, "memorial/create_memorial.html", {"form": form})



def health_check(request):
    """Simple page showing service health"""
    return render(request, "health_check.html", {
        "status": "healthy",
        "service": "memorial-cards"
    })
7
vb,
# def register_nfc_tag(request):
#     """Register an NFC tag for a memorial via form"""
#     if request.method == "POST":
#         memorial_id = request.POST.get("memorial_id")
#         tag_data = request.POST.get("tag_data")
#
#         memorial = get_object_or_404(Memorial, pk=memorial_id)
#         NfcTag.objects.create(memorial=memorial, tag_data=tag_data)
#
#         return redirect("memorial_detail", memorial_id=memorial.id)
#
#     memorials = Memorial.objects.all()
#     return render(request, "nfc/register_tag.html", {"memorials": memorials})
